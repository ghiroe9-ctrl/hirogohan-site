(function () {
  "use strict";
  var D = window.SITE_DATA || {};
  var $ = function (id) { return document.getElementById(id); };
  var el = function (tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  var showPh = !!D.showPlaceholders;

  function placeholder(label, file) {
    var d = el("div", "ph");
    var b = el("b", null, "PHOTO");
    d.appendChild(b);
    d.appendChild(document.createTextNode(label + (file ? " — " + file : "")));
    d.setAttribute("role", "img");
    d.setAttribute("aria-label", "写真準備中：" + label);
    return d;
  }
  function img(src, alt, eager, pos) {
    var i = document.createElement("img");
    i.src = src; i.alt = alt || "";
    if (pos) i.style.objectPosition = pos;
    i.decoding = "async";
    i.loading = eager ? "eager" : "lazy";
    return i;
  }

  /* HERO */
  var hero = $("heroPhoto");
  var m = D.model || {};
  if (m.heroImage) { var hi = img(m.heroImage, m.heroAlt, true, m.heroPosition); hi.fetchPriority = "high"; hero.appendChild(hi); }
  else hero.appendChild(placeholder("Hero portrait 4:5", "images/hero.jpg"));

  /* PROFILE (confirmed only) */
  var pl = $("profileList");
  (D.profile || []).filter(function (p) { return p.confirmed; }).forEach(function (p) {
    var row = el("div");
    row.appendChild(el("dt", null, p.label));
    row.appendChild(el("dd", null, p.value));
    pl.appendChild(row);
  });

  /* PORTFOLIO */
  var items = (D.portfolio || []).filter(function (p) { return p.src || showPh; });
  var cats = (D.portfolioCategories || []).filter(function (c) {
    return items.some(function (p) { return p.category === c.id; });
  });
  var tabs = $("portfolioTabs"), gallery = $("gallery");
  if (!items.length) {
    $("portfolio").hidden = true;
    document.querySelectorAll('a[href="#portfolio"]').forEach(function (a) { a.hidden = true; });
  } else {
    var all = [{ id: "all", label: "All" }].concat(cats);
    all.forEach(function (c, i) {
      var b = el("button", null, c.label);
      b.type = "button"; b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", i === 0 ? "true" : "false");
      b.addEventListener("click", function () {
        tabs.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-selected", "false"); });
        b.setAttribute("aria-selected", "true");
        renderGallery(c.id);
      });
      tabs.appendChild(b);
    });
    renderGallery("all");
  }
  function catLabel(id) {
    var c = (D.portfolioCategories || []).filter(function (x) { return x.id === id; })[0];
    return c ? c.label : id;
  }
  function renderGallery(id) {
    gallery.innerHTML = "";
    items.filter(function (p) { return id === "all" || p.category === id; }).forEach(function (p) {
      var li = el("li"), b = el("button"), f = el("span", "frame");
      b.type = "button";
      b.setAttribute("aria-label", (p.alt || p.caption || "写真") + " を拡大");
      f.appendChild(p.src ? img(p.src, p.alt, false, p.position) : placeholder(catLabel(p.category)));
      b.appendChild(f);
      b.appendChild(el("span", "cap", catLabel(p.category) + (p.caption ? " / " + p.caption : "")));
      b.addEventListener("click", function () { openLightbox(p, b); });
      li.appendChild(b); gallery.appendChild(li);
    });
  }

  /* LIGHTBOX */
  var lb = $("lightbox"), lastFocus = null;
  function openLightbox(p, from) {
    lastFocus = from;
    var media = $("lbMedia"); media.innerHTML = "";
    media.appendChild(p.src ? img(p.src, p.alt, true) : placeholder(catLabel(p.category)));
    $("lbCap").textContent = catLabel(p.category) + (p.caption ? " / " + p.caption : "");
    lb.hidden = false; document.body.style.overflow = "hidden";
    $("lbClose").focus();
  }
  function closeLightbox() {
    lb.hidden = true; document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  $("lbClose").addEventListener("click", closeLightbox);
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) closeLightbox(); });

  /* WORKS */
  var wl = $("worksList");
  (D.works || []).forEach(function (w) {
    var li = el("li", "work");
    if (w.image) { var wi = el("div", "work__img"); wi.appendChild(img(w.image, w.title)); li.appendChild(wi); }
    var body = el("div", "work__body");
    body.appendChild(el("p", "work__genre", w.genre));
    body.appendChild(el("h3", "work__title", w.title));
    if (w.detail) body.appendChild(el("p", "work__detail", w.detail));
    if (w.body) body.appendChild(el("p", "work__text", w.body));
    if (w.tags && w.tags.length) {
      var ul = el("ul", "work__tags");
      w.tags.forEach(function (t) { ul.appendChild(el("li", null, t)); });
      body.appendChild(ul);
    }
    li.appendChild(body); wl.appendChild(li);
  });

  /* COMPOSITE — サイト内のPDF（file）を優先。無ければ Google ドライブ */
  var c = D.composite || {};
  var compUrl = c.file || (c.driveFileId ? "https://drive.google.com/file/d/" + c.driveFileId + "/view" : "");
  if (compUrl) {
    $("compositeView").href = compUrl;
    var dl = $("compositeDl");
    if (c.file) { dl.href = c.file; dl.setAttribute("download", c.downloadName || "HIRO_composite.pdf"); }
    else dl.href = "https://drive.google.com/uc?export=download&id=" + c.driveFileId;
    var frame = $("compositeFrame");
    if (c.cover) {
      var a = document.createElement("a");
      a.href = compUrl; a.target = "_blank"; a.rel = "noopener";
      a.setAttribute("aria-label", "コンポジット（PDF）を開く");
      a.appendChild(img(c.cover, "HIRO. コンポジットの表紙", false, "50% 0%"));
      frame.appendChild(a);
    }
    if (c.updated) $("compositeUpdated").textContent = "Last updated: " + c.updated;
  }
  document.querySelectorAll('a[href="#composite"]').forEach(function (a) {
    if (!compUrl) a.hidden = true;
  });

  /* JOURNEY */
  var jl = $("journeyList");
  (D.journey || []).forEach(function (j) {
    var li = el("li"), d = el("div");
    d.appendChild(el("h3", null, j.title));
    d.appendChild(el("p", null, j.body));
    li.appendChild(d); jl.appendChild(li);
  });

  /* CONTACT */
  var ct = D.contact || {};
  var sel = $("f-genre");
  (ct.genres || []).forEach(function (g) { var o = el("option", null, g); o.value = g; sel.appendChild(o); });
  if (m.instagram) $("dmLink").href = m.instagram;

  var form = $("contactForm"), status = $("formStatus"), btn = $("submitBtn");
  var loadedAt = Date.now();
  function setStatus(msg, kind) { status.textContent = msg; status.className = "form__status" + (kind ? " is-" + kind : ""); }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var bad = null;
    form.querySelectorAll("[required]").forEach(function (f) {
      var ok = f.type === "checkbox" ? f.checked : f.value.trim() !== "" && f.checkValidity();
      f.setAttribute("aria-invalid", ok ? "false" : "true");
      if (!ok && !bad) bad = f;
    });
    if (bad) { setStatus("未入力または形式が正しくない項目があります。赤枠の項目をご確認ください。", "err"); bad.focus(); return; }

    // spam: honeypot filled or submitted unnaturally fast → silently drop
    if ($("f-website").value || Date.now() - loadedAt < 3000) {
      setStatus("送信しました。内容を確認のうえ、ご連絡いたします。", "ok"); form.reset(); return;
    }
    if (!ct.formEndpoint) {
      setStatus("フォームは現在準備中です。お手数ですが Instagram の DM（@hiro._model）からご連絡ください。", "err");
      return;
    }
    btn.disabled = true; btn.textContent = "送信中…"; setStatus("");
    var payload = {};
    new FormData(form).forEach(function (v, k) { payload[k] = v; });
    payload._subject = "【HIRO.サイト】撮影のご相談：" + (payload.company || "");
    payload._template = "table";
    payload._replyto = payload.email;
    fetch(ct.formEndpoint, { method: "POST", body: JSON.stringify(payload), headers: { "Content-Type": "application/json", Accept: "application/json" } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (res) {
        if (res && String(res.success) === "false") throw new Error(res.message || "rejected");
        form.reset();
        setStatus("送信しました。お問い合わせありがとうございます。2〜3日以内にメールでご連絡いたします。", "ok");
      })
      .catch(function () {
        setStatus("送信できませんでした。通信環境をご確認のうえ再度お試しいただくか、Instagram の DM からご連絡ください。", "err");
      })
      .finally(function () { btn.disabled = false; btn.textContent = "送信する"; });
  });

  var y = $("year"); if (y) y.textContent = new Date().getFullYear();
})();
