/******/ (() => { // webpackBootstrap
/*!*********************************************!*\
  !*** ./src/show-more-container/frontend.js ***!
  \*********************************************/
(function () {
  function init(root) {
    const content = root.querySelector('.va-show-more__content');
    const btn = root.querySelector('.va-show-more__btn');
    const fade = root.querySelector('.va-show-more__fade');
    if (!content || !btn) return;
    const moreText = root.dataset.label || btn.textContent || 'Переглянути всі';
    const lessText = 'Показати менше';
    const mobileOnly = (root.dataset.mobileOnly || '').toString() === '1' || (root.dataset.mobileOnly || '').toString() === 'true';
    const isMobile = () => window.matchMedia('(max-width: 960px)').matches;
    const threshold = () => Math.max(0, window.innerHeight - 380);
    const layout = () => {
      if (mobileOnly && !isMobile()) {
        const h = content.scrollHeight;
        root.classList.remove('is-expanded');
        root.classList.remove('needs-toggle');
        root.style.setProperty('--va-expanded', h + 'px');
        root.style.setProperty('--va-collapsed', h + 'px');
        root.style.setProperty('--va-cut-collapsed', '0px');
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = moreText;
        if (fade) fade.style.opacity = '0';
        return;
      }
      const th = threshold();
      const h = content.scrollHeight;
      const need = h > th + 1;
      const cut = need ? Math.max(0, h - th) : 0;
      root.classList.toggle('needs-toggle', need);
      if (!need) root.classList.remove('is-expanded');
      root.style.setProperty('--va-expanded', h + 'px');
      root.style.setProperty('--va-collapsed', (need ? th : h) + 'px');
      root.style.setProperty('--va-cut-collapsed', cut + 'px');
      const expanded = root.classList.contains('is-expanded');
      btn.textContent = expanded ? lessText : moreText;
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      if (fade) fade.style.opacity = expanded ? '0' : '1';
    };
    btn.addEventListener('click', () => {
      root.classList.toggle('is-expanded');
      layout();
    });
    layout();
    let rId;
    const schedule = () => {
      cancelAnimationFrame(rId);
      rId = requestAnimationFrame(layout);
    };
    window.addEventListener('resize', schedule);
    window.addEventListener('orientationchange', schedule);
    root.querySelectorAll('img').forEach(img => img.addEventListener('load', schedule, {
      once: true
    }));
    const ro = new ResizeObserver(schedule);
    ro.observe(content);
    ro.observe(root);
    const mo = new MutationObserver(schedule);
    mo.observe(content, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule).catch(() => {});
    root.addEventListener('va:show-more:layout', schedule);
  }
  function ready(fn) {
    if (document.readyState !== 'loading') fn();else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(() => {
    document.querySelectorAll('.va-show-more').forEach(init);
  });
})();
/******/ })()
;
//# sourceMappingURL=frontend.js.map