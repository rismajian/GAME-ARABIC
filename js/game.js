/**
 * Arabic Princess Battle - Core Game Logic
 */
window.Game = (function () {
  let config = {};
  let state = {
    hpPink: 100, hpLavender: 100, questions: [], currentQ: 0,
    correct: 0, wrong: 0, history: [], matchTimeLeft: 0,
    questionTimeLeft: 15, waitingAnswer: false, selectedAnswer: null,
    isPaused: false, isRunning: false
  };
  let matchTimerId = null, questionTimerId = null;
  const els = {};

  function cacheEls() {
    els.hpPink = document.getElementById('hp-pink');
    els.hpLavender = document.getElementById('hp-lavender');
    els.hpPinkText = document.getElementById('hp-pink-text');
    els.hpLavenderText = document.getElementById('hp-lavender-text');
    els.matchTimer = document.getElementById('match-timer');
    els.questionTimer = document.getElementById('question-timer');
    els.qCategory = document.getElementById('q-category');
    els.qText = document.getElementById('q-text');
    els.qOptions = document.getElementById('q-options');
    els.qProgressBar = document.getElementById('q-progress-bar');
    els.feedbackPanel = document.getElementById('feedback-panel');
    els.feedbackIcon = document.getElementById('feedback-icon');
    els.feedbackText = document.getElementById('feedback-text');
    els.feedbackExplanation = document.getElementById('feedback-explanation');
    els.charPink = document.getElementById('char-pink');
    els.charLavender = document.getElementById('char-lavender');
    els.namePink = document.getElementById('name-pink');
    els.nameLavender = document.getElementById('name-lavender');
    els.magicEffect = document.getElementById('magic-effect');
    els.countdownOverlay = document.getElementById('countdown-overlay');
    els.countdownNumber = document.getElementById('countdown-number');
  }

  function start(cfg) {
    config = { ...cfg };
    window.Game.lastConfig = config;
    cacheEls();
    state = {
      hpPink: 100, hpLavender: 100,
      questions: getQuestionsByFilter({ subject: config.subject, difficulty: config.difficulty, count: 25 }),
      currentQ: 0, correct: 0, wrong: 0, history: [],
      matchTimeLeft: (config.durationMin || 5) * 60,
      questionTimeLeft: 15, waitingAnswer: false, selectedAnswer: null,
      isPaused: false, isRunning: true
    };
    if (els.nameLavender) els.nameLavender.textContent = config.playerName || 'Kamu';
    if (els.namePink) els.namePink.textContent = config.mode === 'latihan' ? 'Practice' : 'AI Wardah';
    if (els.charLavender) els.charLavender.querySelector('.girl-sprite').textContent = config.playerAvatar || '⭐';
    if (els.charPink) els.charPink.querySelector('.girl-sprite').textContent = '🌸';
    updateHP();
    showScreen('screen-arena');
    document.getElementById('feedback-panel')?.setAttribute('hidden', '');
    runCountdown(() => { startMatchTimers(); nextQuestion(); });
  }

  function runCountdown(cb) {
    const overlay = els.countdownOverlay, num = els.countdownNumber;
    if (!overlay || !num) { cb(); return; }
    overlay.removeAttribute('hidden');
    let n = 3; num.textContent = n;
    const id = setInterval(() => {
      n--;
      if (n > 0) { num.textContent = n; num.style.animation = 'none'; void num.offsetWidth; num.style.animation = 'countPop 0.8s ease-out'; }
      else if (n === 0) num.textContent = 'GO! ✨';
      else { clearInterval(id); overlay.setAttribute('hidden', ''); cb(); }
    }, 800);
  }

  function startMatchTimers() {
    clearInterval(matchTimerId);
    matchTimerId = setInterval(() => {
      if (state.isPaused || !state.isRunning) return;
      state.matchTimeLeft--;
      updateMatchTimer();
      if (state.matchTimeLeft <= 0) endMatch('timeout');
    }, 1000);
    updateMatchTimer();
  }

  function updateMatchTimer() {
    if (!els.matchTimer) return;
    const m = Math.floor(state.matchTimeLeft / 60);
    const s = state.matchTimeLeft % 60;
    els.matchTimer.textContent = `${m}:${s.toString().padStart(2, '0')}`;
  }

  function nextQuestion() {
    if (!state.isRunning) return;
    if (state.currentQ >= state.questions.length) {
      state.questions = getQuestionsByFilter({ subject: config.subject, difficulty: config.difficulty, count: 15 });
      state.currentQ = 0;
    }
    const q = state.questions[state.currentQ];
    state.selectedAnswer = null; state.waitingAnswer = true; state.questionTimeLeft = 15;

    if (els.qCategory) {
      const catMap = { mufradat: 'Mufradāt', qawaid: 'Qawā‘id', tarjamah: 'Tarjamah', qiraah: 'Qirā’ah', insya: 'Insya’' };
      els.qCategory.textContent = `${catMap[q.subject] || q.category} · ${q.difficulty.toUpperCase()}`;
    }
    if (els.qText) {
      // Support mixed Arabic + Indonesian
      els.qText.innerHTML = q.question.replace(/([\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\s]+)/g, '<span class="arabic-text">$1</span>');
    }
    if (els.qOptions) {
      els.qOptions.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'q-opt';
        const hasArabic = /[\u0600-\u06FF]/.test(opt);
        const optHtml = hasArabic ? `<span class="arabic-text">${opt}</span>` : opt;
        btn.innerHTML = `<span class="opt-letter">${letters[i]}</span><span>${optHtml}</span>`;
        btn.addEventListener('click', () => selectAnswer(i));
        els.qOptions.appendChild(btn);
      });
    }
    document.getElementById('feedback-panel')?.setAttribute('hidden', '');
    startQuestionTimer();
  }

  function startQuestionTimer() {
    cancelAnimationFrame(questionTimerId);
    const start = Date.now(), duration = 15000;
    function tick() {
      if (state.isPaused || !state.waitingAnswer) return;
      const left = Math.max(0, duration - (Date.now() - start));
      state.questionTimeLeft = Math.ceil(left / 1000);
      if (els.questionTimer) {
        els.questionTimer.textContent = state.questionTimeLeft;
        els.questionTimer.classList.toggle('urgent', state.questionTimeLeft <= 5);
      }
      if (els.qProgressBar) els.qProgressBar.style.width = (left / duration * 100) + '%';
      if (left <= 0) { lockAnswer(null); return; }
      questionTimerId = requestAnimationFrame(tick);
    }
    questionTimerId = requestAnimationFrame(tick);
  }

  function selectAnswer(index) {
    if (!state.waitingAnswer || state.selectedAnswer !== null) return;
    state.selectedAnswer = index;
    els.qOptions?.querySelectorAll('.q-opt').forEach((o, i) => o.classList.toggle('selected', i === index));
    setTimeout(() => lockAnswer(index), 280);
  }

  function lockAnswer(playerIndex) {
    if (!state.waitingAnswer) return;
    state.waitingAnswer = false;
    cancelAnimationFrame(questionTimerId);
    const q = state.questions[state.currentQ];
    const isCorrect = playerIndex === q.answer;
    const damage = q.damage || 15;

    els.qOptions?.querySelectorAll('.q-opt').forEach((o, i) => {
      o.classList.remove('selected');
      if (i === q.answer) o.classList.add('correct');
      if (playerIndex !== null && i === playerIndex && !isCorrect) o.classList.add('wrong');
      o.style.pointerEvents = 'none';
    });

    state.history.push({ question: q.question, options: q.options, correctIndex: q.answer, playerIndex, isCorrect, explanation: q.explanation, category: q.category, subject: q.subject });

    if (isCorrect) {
      state.correct++; sfxCorrect();
      applyDamage('pink', damage); animateAttack('lavender', 'pink');
      showFeedback(true, q.explanation, damage);
    } else {
      state.wrong++; sfxWrong();
      if (config.mode === 'solo') {
        const aiAcc = config.difficulty === 'easy' ? 0.55 : config.difficulty === 'hard' ? 0.75 : 0.65;
        if (Math.random() < aiAcc) {
          applyDamage('lavender', damage); animateAttack('pink', 'lavender');
          showFeedback(false, q.explanation, 0, true);
        } else showFeedback(false, q.explanation, 0, false);
      } else showFeedback(false, q.explanation, 0, false);
    }

    setTimeout(() => {
      if (!state.isRunning) return;
      if (state.hpPink <= 0 || state.hpLavender <= 0) {
        endMatch(state.hpPink <= 0 ? 'ko-lavender' : 'ko-pink'); return;
      }
      state.currentQ++; nextQuestion();
    }, 2800);
  }

  function applyDamage(team, amount) {
    if (team === 'pink') state.hpPink = Math.max(0, state.hpPink - amount);
    else state.hpLavender = Math.max(0, state.hpLavender - amount);
    updateHP();
  }
  function updateHP() {
    if (els.hpPink) els.hpPink.style.width = state.hpPink + '%';
    if (els.hpLavender) els.hpLavender.style.width = state.hpLavender + '%';
    if (els.hpPinkText) els.hpPinkText.textContent = state.hpPink;
    if (els.hpLavenderText) els.hpLavenderText.textContent = state.hpLavender;
  }

  function animateAttack(from, to) {
    sfxAttack();
    const attacker = from === 'lavender' ? els.charLavender : els.charPink;
    const defender = to === 'lavender' ? els.charLavender : els.charPink;
    attacker?.classList.add('attack');
    setTimeout(() => {
      attacker?.classList.remove('attack');
      defender?.classList.add('hit');
      if (els.magicEffect) {
        els.magicEffect.textContent = from === 'lavender' ? '⭐📚' : '🌸✨';
        els.magicEffect.classList.add('show');
        setTimeout(() => els.magicEffect.classList.remove('show'), 450);
      }
      setTimeout(() => defender?.classList.remove('hit'), 400);
    }, 250);
  }

  function showFeedback(correct, explanation, damage, aiHit = false) {
    if (!els.feedbackPanel) return;
    els.feedbackPanel.removeAttribute('hidden');
    if (correct) {
      els.feedbackIcon.textContent = '✨';
      els.feedbackText.textContent = `YAY! Jawaban benar! +${damage} magic ✨`;
      els.feedbackText.style.color = '#5A9A7A';
    } else {
      els.feedbackIcon.textContent = '💗';
      els.feedbackText.textContent = aiHit ? 'Oopsie! Lawan menyerangmu 🌸' : 'Oopsie! Belum tepat, yuk belajar lagi! 💗';
      els.feedbackText.style.color = '#E979A9';
    }
    els.feedbackExplanation.textContent = explanation;
  }

  function endMatch(reason) {
    state.isRunning = false;
    clearInterval(matchTimerId); cancelAnimationFrame(questionTimerId);
    let winner = null;
    if (reason === 'ko-lavender') winner = 'lavender';
    else if (reason === 'ko-pink') winner = 'pink';
    else {
      if (state.hpLavender > state.hpPink) winner = 'lavender';
      else if (state.hpPink > state.hpLavender) winner = 'pink';
      else winner = 'draw';
    }
    const baseXP = state.correct * 15 + (winner === 'lavender' ? 50 : 20);
    const coins = state.correct * 5 + (winner === 'lavender' ? 30 : 10);
    profile.xp += baseXP; profile.coins += coins; profile.gamesPlayed++;
    profile.correctTotal += state.correct; profile.wrongTotal += state.wrong;
    while (profile.xp >= profile.level * 100) { profile.xp -= profile.level * 100; profile.level++; }
    if (state.correct >= 8 && !profile.badges.includes('Queen of Mufradāt')) profile.badges.push('Queen of Mufradāt');
    if (winner === 'lavender' && !profile.badges.includes('Nahwu Star')) profile.badges.push('Nahwu Star');
    if (config.subject === 'mufradat' && !profile.badges.includes('Arabic Vocabulary Master')) profile.badges.push('Arabic Vocabulary Master');
    if (config.subject === 'qawaid' && !profile.badges.includes('Qirā’ah Explorer')) profile.badges.push('Qirā’ah Explorer');
    saveProfile();

    const banner = document.getElementById('result-banner');
    const teamEl = document.getElementById('result-team');
    const isWin = winner === 'lavender', isDraw = winner === 'draw';
    if (banner) {
      banner.textContent = isWin ? 'MAGICAL VICTORY! 🎀' : isDraw ? 'DRAW! ✨' : 'KEEP LEARNING, LITTLE STAR! ✨';
      banner.className = 'result-banner ' + (isWin ? 'victory' : 'defeat');
    }
    if (teamEl) {
      teamEl.textContent = isWin ? 'Nujum Al-Arabiyyah Menang! ⭐' : isDraw ? 'Seri! Kedua tim sama hebatnya 💗' : 'Wardatul Lughah Menang 🌸';
    }
    document.getElementById('res-hp').textContent = state.hpLavender;
    document.getElementById('res-correct').textContent = state.correct;
    document.getElementById('res-wrong').textContent = state.wrong;
    const acc = state.correct + state.wrong > 0 ? Math.round(state.correct / (state.correct + state.wrong) * 100) : 0;
    document.getElementById('res-acc').textContent = acc + '%';
    document.getElementById('res-xp').textContent = '+' + baseXP;
    document.getElementById('res-coin').textContent = '+' + coins;
    if (isWin) sfxWin(); else sfxLose();
    showScreen('screen-result');
  }

  function showReview() {
    const list = document.getElementById('review-list');
    const summary = document.getElementById('review-summary');
    if (!list) return;
    list.innerHTML = '';
    const total = state.correct + state.wrong;
    summary.textContent = `Kamu menjawab ${state.correct} dari ${total} soal dengan benar. ` + (state.wrong > 0 ? 'Yuk pelajari lagi! 💗' : 'Sempurna, Little Star! ✨');
    state.history.forEach((h, i) => {
      const div = document.createElement('div');
      div.className = 'review-item ' + (h.isCorrect ? 'correct' : 'wrong');
      const letters = ['A','B','C','D'];
      const playerAns = h.playerIndex !== null ? letters[h.playerIndex] + '. ' + h.options[h.playerIndex] : '(tidak dijawab)';
      const correctAns = letters[h.correctIndex] + '. ' + h.options[h.correctIndex];
      div.innerHTML = `<div class="review-q">${i+1}. ${h.question}</div>
        <div class="review-ans">Jawabanmu: ${playerAns}</div>
        <div class="review-ans">Jawaban benar: ${correctAns}</div>
        <div class="review-exp">${h.explanation}</div>`;
      list.appendChild(div);
    });
    showScreen('screen-review');
  }

  function pause() { state.isPaused = true; }
  function resume() { state.isPaused = false; }
  function forceEnd() { state.isRunning = false; clearInterval(matchTimerId); cancelAnimationFrame(questionTimerId); }

  return {
    start, selectAnswer, pause, resume, forceEnd, showReview,
    get isRunning() { return state.isRunning; },
    get waitingAnswer() { return state.waitingAnswer; },
    lastConfig: null
  };
})();
