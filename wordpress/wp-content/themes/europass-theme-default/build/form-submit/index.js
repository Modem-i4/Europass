/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/form-submit/block.json":
/*!************************************!*\
  !*** ./src/form-submit/block.json ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"parts-blocks/form-submit","version":"0.1.0","title":"Надсилання форми","category":"parts-blocks","icon":"feedback","description":"Кнопка для надсилання полів з \\"Компонентів форми\\"","supports":{"html":false,"align":["left","center","right"],"spacing":{"margin":true,"padding":true}},"attributes":{"submitText":{"type":"string","default":"Надіслати"},"scopeClass":{"type":"string","default":".form-scope"},"action":{"type":"string","default":"/"},"method":{"type":"string","default":"POST"},"successMessage":{"type":"string","default":"Форму надіслано успішно."},"errorMessage":{"type":"string","default":"Сталася помилка. Спробуйте ще раз."}},"editorScript":"file:./index.js","viewScript":"file:./frontend.js","style":"file:./style-index.css"}');

/***/ }),

/***/ "./src/form-submit/frontend.js":
/*!*************************************!*\
  !*** ./src/form-submit/frontend.js ***!
  \*************************************/
/***/ (() => {

(function () {
  function serializeScope(scopeEl) {
    const fields = scopeEl.querySelectorAll('[data-form-input="1"][name]');
    const fd = new FormData();
    fields.forEach(el => {
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
  function isEmail(value) {
    if (!value) return false;
    const email = String(value).trim();
    const m = email.match(/^([^@]+)@([^@]+)$/);
    if (!m) return false;
    const localOk = /^[A-Z0-9!#$%&'*+/=?^_`{|}~.-]+$/i.test(m[1]);
    if (!localOk) return false;
    const domainOk = /^[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(m[2]);
    if (!domainOk) return false;
    return true;
  }
  function isScopeComplete(scopeEl) {
    const fields = Array.from(scopeEl.querySelectorAll('[data-form-input="1"][name]')).filter(el => !el.disabled);
    if (!fields.length) return false;
    const hasRequired = fields.some(el => el.required === true);
    const considered = el => hasRequired ? el.required === true : true;
    const groups = new Map();
    for (const el of fields) {
      if ((el.type === 'checkbox' || el.type === 'radio') && considered(el)) {
        const g = groups.get(el.name) || {
          required: false,
          anyChecked: false,
          hasInputs: false
        };
        g.required = true;
        g.anyChecked = g.anyChecked || el.checked;
        g.hasInputs = true;
        groups.set(el.name, g);
      }
    }
    for (const el of fields) {
      var _el$value4;
      if (!considered(el)) continue;
      if (el.type === 'checkbox' || el.type === 'radio') continue;
      const tag = el.tagName.toLowerCase();
      const wantsEmailCheck = el.type === 'email' || el.getAttribute('data-validate-email') === '1';
      if (wantsEmailCheck) {
        var _el$value2;
        const val = ((_el$value2 = el.value) !== null && _el$value2 !== void 0 ? _el$value2 : '').toString().trim();
        if (val === '' || !isEmail(val)) return false;
        continue;
      }
      if (el.type === 'file') {
        if (!(el.files && el.files.length > 0)) return false;
        continue;
      }
      if (tag === 'select') {
        var _el$value3;
        if (((_el$value3 = el.value) !== null && _el$value3 !== void 0 ? _el$value3 : '').trim() === '') return false;
        continue;
      }
      if (((_el$value4 = el.value) !== null && _el$value4 !== void 0 ? _el$value4 : '').toString().trim() === '') return false;
    }
    for (const [, g] of groups) {
      if (g.required && g.hasInputs && !g.anyChecked) return false;
    }
    const consentCheckbox = scopeEl.querySelector('.cc-input[type="checkbox"][required]');
    if (consentCheckbox && !consentCheckbox.checked) return false;
    return true;
  }
  function updateButtonActiveState(btn, scopeEl) {
    const complete = isScopeComplete(scopeEl);
    btn.classList.toggle('active', complete);
    btn.disabled = !complete;
  }
  async function sendForm({
    action,
    method,
    scopeEl,
    button,
    successMessage,
    errorMessage
  }) {
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
      button.classList.remove('is-loading');
      button.classList.add('is-success');
      if (successMessage) alert(successMessage);
      button.textContent = originalText;

      // очищення форми після успіху
      scopeEl.querySelectorAll('[data-form-input="1"][name]').forEach(el => {
        if (el.type === 'checkbox' || el.type === 'radio') {
          el.checked = false;
        } else if (el.type === 'file') {
          el.value = '';
        } else {
          el.value = '';
        }
      });
      updateButtonActiveState(button, scopeEl);
    } catch (e) {
      button.classList.remove('is-loading');
      button.classList.add('is-error');
      if (errorMessage) alert(errorMessage);
      console.error('[form-components] submit failed:', e);
      button.textContent = originalText;
    } finally {
      setTimeout(() => {
        button.classList.remove('is-success', 'is-error');
        updateButtonActiveState(button, scopeEl);
      }, 1200);
    }
  }
  function bindValidation(btn, scopeEl) {
    if (!scopeEl || btn.__fcValBound) return;
    btn.__fcValBound = true;
    const handler = () => updateButtonActiveState(btn, scopeEl);
    handler();
    scopeEl.addEventListener('input', handler);
    scopeEl.addEventListener('change', handler);
  }
  function initOnce(root = document) {
    root.querySelectorAll('[data-form-submit="1"]').forEach(btn => {
      if (btn.__fcBound) return;
      btn.__fcBound = true;
      const scopeClass = btn.getAttribute('data-scope-class') || '.form-scope';
      const action = btn.getAttribute('data-action') || '/';
      const method = (btn.getAttribute('data-method') || 'POST').toUpperCase();
      const successMessage = btn.getAttribute('data-success-message') || 'OK';
      const errorMessage = btn.getAttribute('data-error-message') || 'Error';
      const scopeEl = document.querySelector(scopeClass);
      if (!scopeEl) {
        console.warn('[form-components] scope element not found:', scopeClass);
        btn.disabled = true;
      } else {
        bindValidation(btn, scopeEl);
      }
      btn.addEventListener('click', e => {
        e.preventDefault();
        const scopeElNow = document.querySelector(scopeClass);
        if (!scopeElNow) {
          console.warn('[form-components] scope element not found:', scopeClass);
          alert('Не знайдено контейнер форми: ' + scopeClass);
          return;
        }
        if (!isScopeComplete(scopeElNow)) {
          alert('Перевірте правильність заповнення полів.');
          updateButtonActiveState(btn, scopeElNow);
          return;
        }
        sendForm({
          action,
          method,
          scopeEl: scopeElNow,
          button: btn,
          successMessage,
          errorMessage
        });
      });
    });
  }
  document.addEventListener('DOMContentLoaded', () => initOnce(document));
  document.addEventListener('wp-block-render', e => initOnce(e.target || document));
})();

/***/ }),

/***/ "./src/form-submit/index.js":
/*!**********************************!*\
  !*** ./src/form-submit/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/form-submit/block.json");
/* harmony import */ var _frontend_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./frontend.js */ "./src/form-submit/frontend.js");
/* harmony import */ var _frontend_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_frontend_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./style.scss */ "./src/form-submit/style.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);








(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  edit({
    attributes,
    setAttributes
  }) {
    const {
      submitText,
      scopeClass,
      action,
      method,
      successMessage,
      errorMessage
    } = attributes;
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: `form-component is-submit`
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Налаштування', 'parts-blocks'),
          initialOpen: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: "\u0422\u0435\u043A\u0441\u0442 \u043A\u043D\u043E\u043F\u043A\u0438",
            value: submitText,
            onChange: v => setAttributes({
              submitText: v
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: "scopeClass",
            help: "CSS-\u043A\u043B\u0430\u0441 \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u0430 (\u043D\u0430\u043F\u0440\u0438\u043A\u043B\u0430\u0434 .form-scope), \u0437 \u044F\u043A\u043E\u0433\u043E \u0437\u0431\u0438\u0440\u0430\u0442\u0438\u043C\u0443\u0442\u044C\u0441\u044F \u0432\u0441\u0456 \u043F\u043E\u043B\u044F",
            value: scopeClass,
            onChange: v => setAttributes({
              scopeClass: v
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: "action (URL)",
            value: action,
            onChange: v => setAttributes({
              action: v
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
            label: "method",
            value: method,
            options: [{
              label: 'POST',
              value: 'POST'
            }, {
              label: 'GET',
              value: 'GET'
            }],
            onChange: v => setAttributes({
              method: v
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: "\u041F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u044F \u0443\u0441\u043F\u0456\u0445\u0443",
            value: successMessage,
            onChange: v => setAttributes({
              successMessage: v
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: "\u041F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u044F \u043F\u043E\u043C\u0438\u043B\u043A\u0438",
            value: errorMessage,
            onChange: v => setAttributes({
              errorMessage: v
            })
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        className: "fc-actions",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button", {
          type: "button",
          className: "fc-submit",
          "data-form-submit": "1",
          "data-scope-class": scopeClass || '.form-scope',
          "data-action": action || '/',
          "data-method": method || 'POST',
          "data-success-message": successMessage || 'OK',
          "data-error-message": errorMessage || 'Error',
          children: submitText || 'Надіслати'
        })
      })]
    });
  },
  save({
    attributes
  }) {
    const {
      submitText,
      scopeClass,
      action,
      method,
      successMessage,
      errorMessage
    } = attributes;
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: `form-component is-submit`
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button", {
        type: "button",
        className: "fc-submit",
        "data-form-submit": "1",
        "data-scope-class": scopeClass || '.form-scope',
        "data-action": action || '/',
        "data-method": method || 'POST',
        "data-success-message": successMessage || 'Форму надіслано успішно.',
        "data-error-message": errorMessage || 'Сталася помилка.',
        children: submitText || 'Надіслати'
      })
    });
  }
});

/***/ }),

/***/ "./src/form-submit/style.scss":
/*!************************************!*\
  !*** ./src/form-submit/style.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"form-submit/index": 0,
/******/ 			"form-submit/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkhero_circle_overlayed"] = globalThis["webpackChunkhero_circle_overlayed"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["form-submit/style-index"], () => (__webpack_require__("./src/form-submit/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map