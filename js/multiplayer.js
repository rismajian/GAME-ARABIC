/**
 * BioMath Princess Battle - Multiplayer Module
 * STATUS: Framework siap. Backend perlu dikonfigurasi.
 *
 * Setup Firebase:
 * 1. console.firebase.google.com → buat project
 * 2. Aktifkan Realtime Database
 * 3. Ganti firebaseConfig di bawah
 * 4. Uncomment inisialisasi + tambah script Firebase di index.html
 */
const Multiplayer = (function () {
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  function isConfigured() {
    return firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY";
  }

  function generateRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const btnCreate = document.getElementById('btn-create-room');
    const btnJoin = document.getElementById('btn-join-room');
    const btnCopy = document.getElementById('btn-copy-code');
    const btnReady = document.getElementById('btn-ready');
    const btnLeave = document.getElementById('btn-leave-room');
    const btnJoinPink = document.getElementById('btn-join-pink');
    const btnJoinLav = document.getElementById('btn-join-lavender');

    btnCreate?.addEventListener('click', () => {
      if (!isConfigured()) {
        alert('Multiplayer belum dikonfigurasi 💗\n\nBuka js/multiplayer.js dan README.md untuk petunjuk setup Firebase (gratis).');
        return;
      }
      const code = generateRoomCode();
      document.getElementById('display-room-code').textContent = code;
      document.getElementById('lobby-create-join').hidden = true;
      document.getElementById('lobby-room').hidden = false;
      document.getElementById('lobby-status').textContent = 'Room dibuat! Bagikan kode ke teman ✨';
    });

    btnJoin?.addEventListener('click', () => {
      if (!isConfigured()) {
        alert('Multiplayer belum dikonfigurasi 💗\n\nLihat README.md ya!');
        return;
      }
      const code = (document.getElementById('input-room-code')?.value || '').trim().toUpperCase();
      if (code.length < 4) { alert('Masukkan kode room yang valid'); return; }
      document.getElementById('display-room-code').textContent = code;
      document.getElementById('lobby-create-join').hidden = true;
      document.getElementById('lobby-room').hidden = false;
    });

    btnCopy?.addEventListener('click', () => {
      const code = document.getElementById('display-room-code')?.textContent;
      if (code && navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
          btnCopy.textContent = 'Tersalin!';
          setTimeout(() => btnCopy.textContent = 'Salin', 1500);
        });
      }
    });

    btnLeave?.addEventListener('click', () => {
      document.getElementById('lobby-room').hidden = true;
      document.getElementById('lobby-create-join').hidden = false;
    });

    [btnReady, btnJoinPink, btnJoinLav].forEach(btn => {
      btn?.addEventListener('click', () => {
        if (!isConfigured()) alert('Konfigurasi Firebase diperlukan. Lihat README.md 💗');
      });
    });
  });

  return { isConfigured, generateRoomCode };
})();
