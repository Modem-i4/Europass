/******/ (() => { // webpackBootstrap
/*!******************************************!*\
  !*** ./src/form-submit copy/frontend.js ***!
  \******************************************/
(function () {
  function serializeScope(scopeEl) {
    const fields = scopeEl.querySelectorAll('[data-form-input="1"][name]');
    const fd = new FormData();
    fields.forEach(el => {
      // пропускаємо disabled
      if (el.disabled) return;
      if (el.type === 'checkbox' || el.type === 'radio') {
        if (el.checked) fd.append(el.name, el.value || 'on');
      } else {
        var _el$value;
        fd.append(el.name, (_el$value = el.value) !== null && _el$value !== void 0 ? _el$value : '');
      }
    });
    return fd;
  }
  async function sendForm({
    action,
    method,
    scopeEl,
    button,
    successMessage,
    errorMessage
  }) {
    console.log("SENDD");
    const originalText = button.textContent;
    button.disabled = true;
    button.classList.add('is-loading');
    try {
      const fd = serializeScope(scopeEl);
      const fetchOpts = {
        method: method || 'POST'
      };
      if ((method || 'POST').toUpperCase() === 'GET') {
        const params = new URLSearchParams();
        for (const [k, v] of fd.entries()) params.append(k, v);
        const url = action.includes('?') ? `${action}&${params}` : `${action}?${params}`;
        const res = await fetch(url, {
          method: 'GET',
          credentials: 'same-origin'
        });
        if (!res.ok) throw new Error('Network error');
      } else {
        fetchOpts.body = fd;
        fetchOpts.credentials = 'same-origin';
        const res = await fetch(action, fetchOpts);
        if (!res.ok) throw new Error('Network error');
      }

      // Успіх
      button.classList.remove('is-loading');
      button.classList.add('is-success');
      if (successMessage) alert(successMessage);
      button.textContent = originalText;
    } catch (e) {
      button.classList.remove('is-loading');
      button.classList.add('is-error');
      if (errorMessage) alert(errorMessage);
      console.error('[form-components] submit failed:', e);
      button.textContent = originalText;
    } finally {
      button.disabled = false;
      setTimeout(() => {
        button.classList.remove('is-success', 'is-error');
      }, 1200);
    }
  }
  function initOnce(root = document) {
    root.querySelectorAll('[data-form-submit="1"]').forEach(btn => {
      if (btn.__fcBound) return;
      btn.__fcBound = true;
      btn.addEventListener('click', e => {
        e.preventDefault();
        const scopeClass = btn.getAttribute('data-scope-class') || '.form-scope';
        const action = btn.getAttribute('data-action') || '/';
        const method = (btn.getAttribute('data-method') || 'POST').toUpperCase();
        const successMessage = btn.getAttribute('data-success-message') || 'OK';
        const errorMessage = btn.getAttribute('data-error-message') || 'Error';
        const scopeEl = document.querySelector(scopeClass);
        if (!scopeEl) {
          console.warn('[form-components] scope element not found:', scopeClass);
          alert('Не знайдено контейнер форми: ' + scopeClass);
          return;
        }
        sendForm({
          action,
          method,
          scopeEl,
          button: btn,
          successMessage,
          errorMessage
        });
      });
    });
  }
  document.addEventListener('DOMContentLoaded', () => initOnce(document));
  // На випадок динамічних вставок
  document.addEventListener('wp-block-render', e => initOnce(e.target || document));
  console.log("HERE");
})();
/******/ })()
;
//# sourceMappingURL=frontend.js.map