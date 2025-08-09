import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

Swiper.use([Navigation, Pagination]);
 
export function initNewsSlider(root, opts = {}) {
  if (!root) return;

  const container = root.closest('.swiper-container') || root.querySelector?.('.swiper-container') || root;
  const sliderEl  = container.querySelector('.news-slider.swiper');
  if (!sliderEl || sliderEl.classList.contains('swiper-initialized')) return;

  const isEditor = !!opts.isEditor || sliderEl.classList.contains('is-editor');
  const slidesPerViewAttr  = sliderEl.dataset.slidesPerView;
  const baseSlidesPerView  = slidesPerViewAttr ? parseInt(slidesPerViewAttr, 10) : 3;

  new Swiper(sliderEl, {
    slidesPerView: baseSlidesPerView,
    spaceBetween: 16,
    allowTouchMove: !isEditor,
    simulateTouch: !isEditor,
    preventClicks: false,
    preventClicksPropagation: false,
    navigation: {
      nextEl: container.querySelector('.swiper-button-next'),
      prevEl: container.querySelector('.swiper-button-prev'),
    },
    pagination: {
      el: container.querySelector('.swiper-pagination'),
      clickable: true,
    },
    breakpoints: {
      0:   { slidesPerView: 1, slidesPerGroup: 1 },
      768: { slidesPerView: 2, slidesPerGroup: 2 },
      1024:{ slidesPerView: baseSlidesPerView },
    },
    watchOverflow: true,
    observer: true,
    observeParents: true,
  });
}

// Public part
window.addEventListener('load', () => {
  document.querySelectorAll('.swiper-container').forEach((c) => initNewsSlider(c));
});
