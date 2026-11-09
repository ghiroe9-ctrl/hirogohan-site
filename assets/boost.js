/* ひろごはん：計測の補強（スクロール深度・滞在）と、記事ページのLINE導線 */
(function () {
  var LINE = 'https://line.me/R/ti/p/@433gemgx';
  function ev(name, params) { if (typeof gtag === 'function') gtag('event', name, params || {}); }

  /* 1. スクロール深度（25/50/75/100%）と滞在10秒・30秒 */
  var marks = [25, 50, 75, 100], sent = {};
  function onScroll() {
    var se = document.scrollingElement || document.documentElement;
    var max = Math.max(se.scrollHeight, document.body.scrollHeight) - window.innerHeight;
    if (max <= 0) return;
    var pct = (window.pageYOffset || se.scrollTop || 0) / max * 100;
    marks.forEach(function (m) {
      if (!sent[m] && pct >= m - 1) { sent[m] = 1; ev('scroll_depth', { percent: m, page: location.pathname }); }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  [10, 30].forEach(function (s) {
    setTimeout(function () { if (document.visibilityState === 'visible') ev('engaged_time', { seconds: s, page: location.pathname }); }, s * 1000);
  });

  /* 2. 記事ページ：冒頭のLINE案内と、スマホ下部の追従ボタン（トップページは独自のものがあるので除外） */
  var main = document.querySelector('main');
  var lead = main && main.querySelector('.lead');
  var isArticle = document.body.hasAttribute('data-article');
  if (!isArticle || !lead || document.getElementById('sticky-line')) return;

  var css = document.createElement('style');
  css.textContent =
    '.a-offer{margin-top:20px;background:var(--surface);border:1.5px solid var(--line);border-radius:18px;padding:16px 18px;display:grid;gap:10px}' +
    '.a-offer p{margin:0;font-size:14px;line-height:1.7;font-weight:700;color:var(--ink)}' +
    '.a-offer p span{display:inline-block;background:var(--line-green);color:#fff;font-size:12px;padding:2px 10px;border-radius:99px;margin-right:8px;vertical-align:1px}' +
    '.a-offer .btn{justify-self:start}' +
    '.a-sticky{position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom));z-index:6;display:none;align-items:center;justify-content:space-between;gap:10px;background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:10px 10px 10px 16px;box-shadow:0 8px 24px rgba(0,0,0,.14);transform:translateY(140%);transition:transform .25s ease}' +
    '.a-sticky.show{transform:none}' +
    '.a-sticky p{margin:0;font-size:13px;line-height:1.5;font-weight:700;color:var(--ink)}' +
    '.a-sticky p small{display:block;font-weight:500;color:var(--muted);font-size:11px}' +
    '.a-sticky .btn{padding:10px 16px;font-size:14px;white-space:nowrap;justify-self:auto}' +
    '@media (max-width:720px){.a-sticky{display:flex}body{padding-bottom:84px}}' +
    '@media (prefers-reduced-motion:reduce){.a-sticky{transition:none}}';
  document.head.appendChild(css);

  var offer = document.createElement('div');
  offer.className = 'a-offer';
  offer.innerHTML = '<p><span>LINEで無料</span>体のことの相談と、写真を送るだけでカロリー・栄養がわかる「食事コーチアプリ」をプレゼントしています</p>' +
    '<a class="btn" data-cta="article-top" href="' + LINE + '" target="_blank" rel="noopener">LINEで受け取る（無料）</a>';
  lead.insertAdjacentElement('afterend', offer);

  var bar = document.createElement('div');
  bar.className = 'a-sticky';
  bar.setAttribute('aria-hidden', 'true');
  bar.innerHTML = '<p>気になったらLINEで無料相談<small>食事コーチアプリもプレゼント</small></p>' +
    '<a class="btn" data-cta="article-sticky" href="' + LINE + '" target="_blank" rel="noopener" tabindex="-1">LINEで相談</a>';
  document.body.appendChild(bar);

  if (!('IntersectionObserver' in window)) return;
  var watch = [offer].concat([].slice.call(document.querySelectorAll('.cta')));
  var vis = new Map();
  var started = false;
  function upd() {
    var any = false; vis.forEach(function (v) { if (v) any = true; });
    var on = started && !any;
    bar.classList.toggle('show', on);
    bar.setAttribute('aria-hidden', on ? 'false' : 'true');
    var a = bar.querySelector('a'); if (on) a.removeAttribute('tabindex'); else a.setAttribute('tabindex', '-1');
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      vis.set(e.target, e.isIntersecting);
      if (e.target === offer && !e.isIntersecting && e.boundingClientRect.top < 0) started = true;
    });
    upd();
  });
  watch.forEach(function (el) { io.observe(el); });
})();
