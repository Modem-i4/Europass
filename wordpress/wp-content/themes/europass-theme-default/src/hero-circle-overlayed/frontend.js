
console.log('LOADED!');

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#clickable').addEventListener('click', () => {
    console.log('Натиснули кнопку!');
  });
});
