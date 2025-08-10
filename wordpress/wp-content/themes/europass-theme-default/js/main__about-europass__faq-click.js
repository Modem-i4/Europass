export function toggleFaqActiveClass() {
	const items = document.querySelectorAll('.main__about-europass__faq');

	items.forEach(item => {
		const arrow = item.querySelector('.main__about-europass__faq__icon-arow-right');
		const iconWrapper = item.querySelector('.main__about-europass__faq__icon-arow');
		const iconImg = iconWrapper?.querySelector('img');
		const activeContent = item.nextElementSibling?.classList.contains('main__about-europass__faq-active')
			? item.nextElementSibling
			: null;

		if (iconImg) {
			const originalSrc = iconImg.getAttribute('src');
			const newSrc = '/wp-content/themes/europass-theme-default/assets/images/arrow-left.svg';

			let toggled = false;

			item.addEventListener('click', () => {
				item.classList.toggle('main__about-europass__faq-activea-click');

				if (arrow) {
					arrow.classList.toggle('active-arow');
				}

				iconImg.setAttribute('src', toggled ? originalSrc : newSrc);
				toggled = !toggled;

				// Перемикаємо клас на сусідньому елементі
				if (activeContent) {
					activeContent.classList.toggle('main__about-europass__faq-active-visible');
				}
			});
		}
	});
}
