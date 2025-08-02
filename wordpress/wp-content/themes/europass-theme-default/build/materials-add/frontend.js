/******/ (() => { // webpackBootstrap
/*!***************************************!*\
  !*** ./src/materials-add/frontend.js ***!
  \***************************************/
console.log('LOADED 1!');
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const cards = document.querySelectorAll('.file-card');
  searchInput.addEventListener('input', function () {
    const query = this.value.trim().toLowerCase();
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(query)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
/******/ })()
;
//# sourceMappingURL=frontend.js.map