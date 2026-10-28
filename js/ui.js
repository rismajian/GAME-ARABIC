/**
 * BioMath Princess Battle - UI & Storage
 */
const AVATARS = ['🌸','⭐','📚','🌙','🦋','👑','🌺','✨','🎀','🌟','📖','🖊️'];

const DEFAULT_PROFILE = {
  nickname: '',
  avatar: '🌸',
  level: 1,
  xp: 0,
  coins: 0,
  badges: [],
  gamesPlayed: 0,
  correctTotal: 0,
  wrongTotal: 0
};

let profile = loadProfile();
let settings = loadSettings();

function loadProfile() {
  try {
    const raw = localStorage.getItem('arabic_princess_profile');
    return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : { ...DEFAULT_PROFILE };
  } catch { return { ...DEFAULT_PROFILE }; }
}
function saveProfile() {
  localStorage.setItem('arabic_princess_profile', JSON.stringify(profile));
  updateHomeProfile();
}
function loadSettings() {
  try {
    const raw = localStorage.getItem('arabic_princess_settings');
    return raw ? JSON.parse(raw) : { muted: false, volume: 60 };
  } catch { return { muted: false, volume: 60 }; }
}
function saveSettings() {
  localStorage.setItem('arabic_princess_settings', JSON.stringify(settings));
}

function updateHomeProfile() {
  const a = document.getElementById('home-avatar');
  const n = document.getElementById('home-nick');
  const l = document.getElementById('home-level');
  if (a) a.textContent = profile.avatar || '🌸';
  if (n) n.textContent = profile.nickname || 'Little Star';
  if (l) l.textContent = profile.level;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

function initAvatars() {
  const grid = document.getElementById('avatar-grid');
  if (!grid) return;
  grid.innerHTML = '';
  AVATARS.forEach(a => {
    const btn = document.createElement('button');
    btn.className = 'avatar-btn' + (a === profile.avatar ? ' active' : '');
    btn.textContent = a;
    btn.dataset.avatar = a;
    btn.addEventListener('click', () => {
      grid.querySelectorAll('.avatar-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      profile.avatar = a;
    });
    grid.appendChild(btn);
  });
}

function setupOptionButtons(containerId, dataAttr, onChange) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.querySelectorAll('.opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (onChange) onChange(btn.dataset[dataAttr]);
    });
  });
}

const audioCtx = typeof AudioContext !== 'undefined' ? new (window.AudioContext || window.webkitAudioContext)() : null;

function playTone(freq, duration, type = 'sine', vol = 0.12) {
  if (!audioCtx || settings.muted) return;
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = (settings.volume / 100) * vol;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

function sfxClick() { playTone(700, 0.07, 'sine', 0.08); }
function sfxCorrect() { playTone(587, 0.1); setTimeout(() => playTone(784, 0.12), 90); setTimeout(() => playTone(988, 0.15), 180); }
function sfxWrong() { playTone(280, 0.2, 'triangle', 0.1); }
function sfxAttack() { playTone(400, 0.08); setTimeout(() => playTone(600, 0.12, 'sine', 0.1), 60); }
function sfxWin() { [523,659,784,1047].forEach((f,i) => setTimeout(() => playTone(f, 0.18), i*110)); }
function sfxLose() { playTone(350, 0.25, 'triangle', 0.08); setTimeout(() => playTone(280, 0.3, 'triangle', 0.08), 200); }

function initSparkles() {
  const canvas = document.getElementById('sparkles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 35; i++) {
    particles.push({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2.2 + 0.6,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      a: Math.random() * 0.45 + 0.15,
      color: Math.random() > 0.5 ? '255,169,200' : '185,167,232'
    });
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

document.addEventListener('DOMContentLoaded', () => {
  initSparkles();
  initAvatars();
  updateHomeProfile();

  const nickInput = document.getElementById('input-nickname');
  if (nickInput) nickInput.value = profile.nickname || '';

  let currentMode = 'solo';
  let currentSubject = 'campuran';
  let currentDiff = 'medium';
  let currentDuration = 5;

  setupOptionButtons('mode-options', 'mode', v => currentMode = v);
  setupOptionButtons('subject-options', 'subject', v => currentSubject = v);
  setupOptionButtons('diff-options', 'diff', v => currentDiff = v);
  setupOptionButtons('duration-options', 'duration', v => currentDuration = parseInt(v));

  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    sfxClick();
    const action = btn.dataset.action;
    const mode = btn.dataset.mode;

    switch (action) {
      case 'start-setup':
        currentMode = mode || 'solo';
        document.querySelectorAll('#mode-options .opt-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.mode === currentMode);
        });
        showScreen('screen-setup');
        break;
      case 'back-home':
        showScreen('screen-home');
        document.getElementById('pause-overlay')?.setAttribute('hidden', '');
        if (window.Game?.isRunning) window.Game.forceEnd();
        break;
      case 'continue-setup':
        const nick = (nickInput?.value || '').trim();
        if (!nick) {
          document.getElementById('err-nickname').hidden = false;
          nickInput?.focus();
          return;
        }
        document.getElementById('err-nickname').hidden = true;
        profile.nickname = nick;
        saveProfile();
        if (currentMode === 'multiplayer') {
          showScreen('screen-lobby');
        } else {
          window.Game.start({
            mode: currentMode,
            subject: currentSubject,
            difficulty: currentDiff,
            durationMin: currentDuration,
            playerName: nick,
            playerAvatar: profile.avatar
          });
        }
        break;
      case 'show-guide': showScreen('screen-guide'); break;
      case 'show-materi': showScreen('screen-materi'); break;
      case 'show-settings':
        showScreen('screen-settings');
        document.getElementById('pause-overlay')?.setAttribute('hidden', '');
        break;
      case 'show-character':
        document.getElementById('char-preview-avatar').textContent = profile.avatar;
        document.getElementById('char-preview-name').textContent = profile.nickname || 'Little Star';
        document.getElementById('char-level').textContent = profile.level;
        document.getElementById('char-coins').textContent = profile.coins;
        document.getElementById('char-xp').textContent = profile.xp;
        const bl = document.getElementById('badge-list');
        bl.innerHTML = '';
        (profile.badges || []).forEach(b => {
          const s = document.createElement('span');
          s.className = 'badge-item';
          s.textContent = b;
          bl.appendChild(s);
        });
        if (!profile.badges?.length) bl.innerHTML = '<span class="small-text">Belum ada badge. Main terus ya! ✨</span>';
        showScreen('screen-character');
        break;
      case 'play-again':
        window.Game.start({
          mode: window.Game.lastConfig?.mode || 'solo',
          subject: window.Game.lastConfig?.subject || 'campuran',
          difficulty: window.Game.lastConfig?.difficulty || 'medium',
          durationMin: window.Game.lastConfig?.durationMin || 5,
          playerName: profile.nickname,
          playerAvatar: profile.avatar
        });
        break;
      case 'show-review':
        window.Game.showReview();
        break;
    }
  });

  const muteBtn = document.getElementById('btn-mute');
  const volSlider = document.getElementById('volume-slider');
  if (muteBtn) {
    muteBtn.textContent = settings.muted ? 'Unmute' : 'Mute';
    muteBtn.addEventListener('click', () => {
      settings.muted = !settings.muted;
      muteBtn.textContent = settings.muted ? 'Unmute' : 'Mute';
      saveSettings();
      sfxClick();
    });
  }
  if (volSlider) {
    volSlider.value = settings.volume;
    volSlider.addEventListener('input', () => {
      settings.volume = parseInt(volSlider.value);
      saveSettings();
    });
  }
  document.getElementById('btn-reset-progress')?.addEventListener('click', () => {
    if (confirm('Yakin mau reset semua progres? 💗')) {
      profile = { ...DEFAULT_PROFILE };
      saveProfile();
      alert('Progres direset! Mulai petualangan baru ya ✨');
    }
  });

  document.getElementById('btn-pause')?.addEventListener('click', () => {
    if (window.Game?.isRunning && window.Game.lastConfig?.mode !== 'multiplayer') {
      window.Game.pause();
      document.getElementById('pause-overlay').removeAttribute('hidden');
    }
  });
  document.getElementById('btn-resume')?.addEventListener('click', () => {
    document.getElementById('pause-overlay').setAttribute('hidden', '');
    window.Game?.resume();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (window.Game?.isRunning && window.Game.lastConfig?.mode !== 'multiplayer') {
        window.Game.pause();
        document.getElementById('pause-overlay').removeAttribute('hidden');
      }
      return;
    }
    if (!window.Game?.isRunning || !window.Game.waitingAnswer) return;
    const key = e.key.toLowerCase();
    const map = { a: 0, b: 1, c: 2, d: 3, '1': 0, '2': 1, '3': 2, '4': 3 };
    if (map[key] !== undefined) window.Game.selectAnswer(map[key]);
  });
});
