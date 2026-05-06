/* Shared runtime: language switcher, mobile nav toggle, page init.
   Depends on window.T_SHARED and window.T_PAGE being set by the
   page-specific translation scripts loaded before this file. */
'use strict';

var lang = 'uz';

function setLang(l) {
  lang = l;
  var t = Object.assign({}, window.T_SHARED[l] || {}, window.T_PAGE[l] || {});
  ['en', 'ru', 'uz'].forEach(function(x) {
    var btn = document.getElementById('btn-' + x);
    if (btn) btn.classList.toggle('active', x === l);
  });
  document.documentElement.lang = l;
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var k = el.getAttribute('data-i18n');
    if (t[k] !== undefined) el.innerHTML = t[k];
  });
  document.querySelectorAll('select option[data-i18n]').forEach(function(opt) {
    var k = opt.getAttribute('data-i18n');
    if (t[k] !== undefined) opt.textContent = t[k].replace(/&amp;/g, '&');
  });
  try { localStorage.setItem('bl', l); } catch(e) {}
}

function toggleMobile() {
  document.getElementById('mobile-nav').classList.toggle('open');
}

/* Init: restore saved language preference */
try {
  var saved = localStorage.getItem('bl');
  setLang(saved && window.T_SHARED[saved] ? saved : 'uz');
} catch(e) {
  setLang('uz');
}
