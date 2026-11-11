/* 「AIに相談」ボタン：右下のボタンから、このページを読んだうえで答えるChatGPT / Claudeを開く */
(function () {
  if (window.__aiConsult) return; window.__aiConsult = true;
  var LINE = 'https://line.me/R/ti/p/@433gemgx';
  var SITE = 'https://ghiroe9-ctrl.github.io/hirogohan-site/';
  var EXAMPLES = [
    '食事コーチアプリで何ができる？',
    'おすすめの間食・補食を教えて',
    '何の習慣から始めればいい？',
    'リブレや腸内環境検査って何がわかる？'
  ];

  var css = '' +
  '.aic-fab{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom));z-index:20;display:flex;align-items:center;gap:8px;border:0;border-radius:999px;padding:12px 18px 12px 14px;font:700 14px/1 "Zen Kaku Gothic New","Hiragino Sans",sans-serif;color:#fff;background:var(--ink,#1D3529);box-shadow:0 8px 24px rgba(0,0,0,.22);cursor:pointer}' +
  '.aic-fab svg{width:20px;height:20px;flex:none}' +
  '.aic-fab:focus-visible,.aic-panel button:focus-visible,.aic-panel textarea:focus-visible{outline:3px solid var(--sun,#F3BE2E);outline-offset:2px}' +
  '@media (max-width:720px){.aic-fab{bottom:calc(92px + env(safe-area-inset-bottom));padding:11px 15px 11px 12px;font-size:13px}}' +
  '.aic-panel{position:fixed;right:16px;bottom:calc(76px + env(safe-area-inset-bottom));z-index:21;width:min(360px,calc(100vw - 32px));background:var(--surface,#fff);color:var(--ink,#1D3529);border:1px solid var(--line,#DCE3D6);border-radius:20px;box-shadow:0 18px 48px rgba(0,0,0,.24);padding:18px;display:none;font-family:"Zen Kaku Gothic New","Hiragino Sans",sans-serif}' +
  '@media (max-width:720px){.aic-panel{bottom:calc(150px + env(safe-area-inset-bottom))}}' +
  '.aic-panel.open{display:block}' +
  '.aic-head{display:flex;justify-content:space-between;align-items:start;gap:8px}' +
  '.aic-head b{font-size:16px;line-height:1.5}' +
  '.aic-head small{display:block;font-size:12px;color:var(--muted,#5E6F64);font-weight:500;margin-top:2px;line-height:1.6}' +
  '.aic-x{border:0;background:none;font-size:22px;line-height:1;color:var(--muted,#5E6F64);cursor:pointer;padding:2px 4px}' +
  '.aic-ex{display:flex;flex-wrap:wrap;gap:6px;margin:12px 0 10px}' +
  '.aic-ex button{border:1px solid var(--line,#DCE3D6);background:var(--bg,#F5F7F0);color:var(--ink,#1D3529);border-radius:999px;padding:6px 10px;font:500 12.5px/1.3 inherit;cursor:pointer;text-align:left}' +
  '.aic-ex button:hover{border-color:var(--leaf,#2F7A55)}' +
  '.aic-panel textarea{width:100%;box-sizing:border-box;min-height:72px;resize:vertical;border:1.5px solid var(--line,#DCE3D6);border-radius:12px;padding:10px 12px;font:400 14px/1.6 inherit;color:var(--ink,#1D3529);background:var(--surface,#fff)}' +
  '.aic-go{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}' +
  '.aic-go button{border:0;border-radius:12px;padding:11px 8px;font:700 14px/1.2 inherit;cursor:pointer;color:#fff}' +
  '.aic-go .gpt{background:#10A37F}.aic-go .cld{background:#C96442}' +
  '.aic-note{font-size:11.5px;color:var(--muted,#5E6F64);line-height:1.7;margin-top:10px}' +
  '.aic-note a{color:var(--leaf,#2F7A55);font-weight:700}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M9 10.5h.01M12 10.5h.01M15 10.5h.01"/></svg>';
  var fab = document.createElement('button');
  fab.type = 'button'; fab.className = 'aic-fab'; fab.setAttribute('aria-expanded', 'false'); fab.setAttribute('aria-controls', 'aic-panel');
  fab.innerHTML = icon + '<span>AIに相談</span>';

  var p = document.createElement('div');
  p.className = 'aic-panel'; p.id = 'aic-panel'; p.setAttribute('role', 'dialog'); p.setAttribute('aria-label', 'AIに相談');
  p.innerHTML =
    '<div class="aic-head"><div><b>このサイトについてAIに聞く</b><small>ChatGPTかClaudeが、このページを読んだうえで答えます。</small></div><button type="button" class="aic-x" aria-label="閉じる">×</button></div>' +
    '<div class="aic-ex"></div>' +
    '<textarea id="aic-q" placeholder="例：朝ごはんを抜く日は何を食べたらいい？" aria-label="質問"></textarea>' +
    '<div class="aic-go"><button type="button" class="gpt" data-ai="chatgpt">ChatGPTで聞く</button><button type="button" class="cld" data-ai="claude">Claudeで聞く</button></div>' +
    '<p class="aic-note">AIの回答は参考情報で、医療的な診断ではありません。ひろに直接聞きたいことは <a href="' + LINE + '" target="_blank" rel="noopener">公式LINE</a> へどうぞ（無料相談）。</p>';
  var ex = p.querySelector('.aic-ex'), q = p.querySelector('#aic-q');
  EXAMPLES.forEach(function (t) {
    var b = document.createElement('button'); b.type = 'button'; b.textContent = t;
    b.addEventListener('click', function () { q.value = t; q.focus(); });
    ex.appendChild(b);
  });

  function track(name, params) { try { if (window.gtag) window.gtag('event', name, params || {}); } catch (e) {} }
  function setOpen(o) {
    p.classList.toggle('open', o); fab.setAttribute('aria-expanded', o ? 'true' : 'false');
    if (o) { q.focus(); track('ai_consult_open', { page: location.pathname }); }
  }
  fab.addEventListener('click', function () { setOpen(!p.classList.contains('open')); });
  p.querySelector('.aic-x').addEventListener('click', function () { setOpen(false); fab.focus(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && p.classList.contains('open')) { setOpen(false); fab.focus(); } });

  function buildPrompt(question) {
    var page = location.href.split('#')[0];
    return '「ひろごはん｜ごきげん習慣コーチ」の公式サイトを見ています。\n' +
      '次のページをブラウジングで開いて内容を確認したうえで、私の質問に日本語でやさしく答えてください。\n' +
      '・今見ているページ：' + page + '\n' +
      (page.indexOf(SITE) === 0 && page !== SITE ? '・トップページ：' + SITE + '\n' : '') +
      'サイトに書かれていないことは推測で答えず「サイトには書かれていない」と伝え、詳しくは公式LINE（' + LINE + '）で無料相談できると案内してください。病気の診断や治療の判断はしないでください。\n\n' +
      '質問：' + question;
  }
  p.querySelectorAll('.aic-go button').forEach(function (b) {
    b.addEventListener('click', function () {
      var question = q.value.trim() || 'このサイトでは何ができますか？おすすめの使い方を教えてください。';
      var prompt = encodeURIComponent(buildPrompt(question));
      var ai = b.getAttribute('data-ai');
      var url = ai === 'claude' ? 'https://claude.ai/new?q=' + prompt : 'https://chatgpt.com/?q=' + prompt;
      track('ai_consult_send', { ai: ai, page: location.pathname });
      window.open(url, '_blank', 'noopener');
    });
  });

  document.body.appendChild(p); document.body.appendChild(fab);
})();
