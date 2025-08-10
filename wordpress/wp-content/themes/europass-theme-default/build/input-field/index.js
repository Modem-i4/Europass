/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/input-field/block.json":
/*!************************************!*\
  !*** ./src/input-field/block.json ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"parts-blocks/form-submit","version":"0.1.0","title":"Form Components","category":"parts-blocks","icon":"feedback","description":"Універсальні елементи форми: input / textarea / submit з відправкою через frontend.js","supports":{"html":false},"attributes":{"variant":{"type":"string","default":"input"},"label":{"type":"string","default":""},"name":{"type":"string","default":""},"placeholder":{"type":"string","default":""},"required":{"type":"boolean","default":false},"inputType":{"type":"string","default":"text"},"rows":{"type":"number","default":4},"submitText":{"type":"string","default":"Надіслати"},"scopeClass":{"type":"string","default":".form-scope"},"action":{"type":"string","default":"/"},"method":{"type":"string","default":"POST"},"successMessage":{"type":"string","default":"Форму надіслано успішно."},"errorMessage":{"type":"string","default":"Сталася помилка. Спробуйте ще раз."}},"editorScript":"file:./index.js","viewScript":"file:./frontend.js","style":"file:./style-index.css"}');

/***/ }),

/***/ "./src/input-field/frontend.js":
/*!*************************************!*\
  !*** ./src/input-field/frontend.js ***!
  \*************************************/
/***/ (() => {

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
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**********************************!*\
  !*** ./src/input-field/index.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/input-field/block.json");
/* harmony import */ var _frontend_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./frontend.js */ "./src/input-field/frontend.js");
/* harmony import */ var _frontend_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_frontend_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







const INPUT_TYPES = ['text', 'email', 'tel', 'number', 'url', 'password', 'date', 'datetime-local', 'time'];
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  edit({
    attributes,
    setAttributes
  }) {
    const {
      variant,
      label,
      name,
      placeholder,
      required,
      inputType,
      rows,
      submitText,
      scopeClass,
      action,
      method,
      successMessage,
      errorMessage
    } = attributes;
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
      className: `form-component is-${variant}`
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Налаштування', 'parts-blocks'),
          initialOpen: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
            label: "Variant",
            value: variant,
            options: [{
              label: 'Input',
              value: 'input'
            }, {
              label: 'Textarea',
              value: 'textarea'
            }, {
              label: 'Submit',
              value: 'submit'
            }],
            onChange: v => setAttributes({
              variant: v
            })
          }), variant !== 'submit' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
              label: "Label",
              value: label,
              onChange: v => setAttributes({
                label: v
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
              label: "name",
              help: "\u0410\u0442\u0440\u0438\u0431\u0443\u0442 name (\u043E\u0431\u043E\u0432\u02BC\u044F\u0437\u043A\u043E\u0432\u043E \u0434\u043B\u044F \u043D\u0430\u0434\u0441\u0438\u043B\u0430\u043D\u043D\u044F)",
              value: name,
              onChange: v => setAttributes({
                name: v
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
              label: "placeholder",
              value: placeholder,
              onChange: v => setAttributes({
                placeholder: v
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
              label: "required",
              checked: !!required,
              onChange: v => setAttributes({
                required: !!v
              })
            })]
          }), variant === 'input' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
            label: "type",
            value: inputType,
            options: INPUT_TYPES.map(t => ({
              label: t,
              value: t
            })),
            onChange: v => setAttributes({
              inputType: v
            })
          }), variant === 'textarea' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalNumberControl, {
            label: "rows",
            min: 2,
            max: 20,
            value: rows,
            onChange: v => setAttributes({
              rows: Number(v) || 4
            })
          }), variant === 'submit' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
              label: "\u0422\u0435\u043A\u0441\u0442 \u043A\u043D\u043E\u043F\u043A\u0438",
              value: submitText,
              onChange: v => setAttributes({
                submitText: v
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
              label: "scopeClass",
              help: "CSS-\u043A\u043B\u0430\u0441 \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u0430 (\u043D\u0430\u043F\u0440\u0438\u043A\u043B\u0430\u0434 .form-scope), \u0437 \u044F\u043A\u043E\u0433\u043E \u0437\u0431\u0438\u0440\u0430\u0442\u0438\u043C\u0443\u0442\u044C\u0441\u044F \u0432\u0441\u0456 \u043F\u043E\u043B\u044F",
              value: scopeClass,
              onChange: v => setAttributes({
                scopeClass: v
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
              label: "action (URL)",
              value: action,
              onChange: v => setAttributes({
                action: v
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
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
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
              label: "\u041F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u044F \u0443\u0441\u043F\u0456\u0445\u0443",
              value: successMessage,
              onChange: v => setAttributes({
                successMessage: v
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
              label: "\u041F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u044F \u043F\u043E\u043C\u0438\u043B\u043A\u0438",
              value: errorMessage,
              onChange: v => setAttributes({
                errorMessage: v
              })
            })]
          })]
        })
      }), variant === 'input' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "fc-field",
        children: [label && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
          className: "fc-label",
          children: label
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
          className: "fc-input",
          type: inputType,
          name: name || '',
          placeholder: placeholder || '',
          required: !!required,
          "data-form-input": "1",
          readOnly: true
        })]
      }), variant === 'textarea' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "fc-field",
        children: [label && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
          className: "fc-label",
          children: label
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("textarea", {
          className: "fc-textarea",
          name: name || '',
          placeholder: placeholder || '',
          rows: rows || 4,
          required: !!required,
          "data-form-input": "1",
          readOnly: true
        })]
      }), variant === 'submit' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "fc-actions",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
          type: "button",
          className: "fc-submit",
          "data-form-submit": "1",
          "data-scope-class": scopeClass || '.form-scope',
          "data-action": action || '/',
          "data-method": method || 'POST',
          "data-success-message": successMessage || 'OK',
          "data-error-message": errorMessage || 'Error',
          children: submitText || 'Надіслати'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "fc-hint",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("code", {
            children: ["scope: ", scopeClass || '.form-scope']
          })
        })]
      })]
    });
  },
  save({
    attributes
  }) {
    const {
      variant,
      label,
      name,
      placeholder,
      required,
      inputType,
      rows,
      submitText,
      scopeClass,
      action,
      method,
      successMessage,
      errorMessage
    } = attributes;
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
      className: `form-component is-${variant}`
    });
    if (variant === 'input') {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        ...blockProps,
        children: [label ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
          className: "fc-label",
          children: label
        }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
          className: "fc-input",
          type: inputType || 'text',
          name: name || '',
          placeholder: placeholder || '',
          required: !!required,
          "data-form-input": "1"
        })]
      });
    }
    if (variant === 'textarea') {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        ...blockProps,
        children: [label ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("label", {
          className: "fc-label",
          children: label
        }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("textarea", {
          className: "fc-textarea",
          name: name || '',
          placeholder: placeholder || '',
          rows: rows || 4,
          required: !!required,
          "data-form-input": "1"
        })]
      });
    }

    // submit
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
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
})();

/******/ })()
;
//# sourceMappingURL=index.js.map