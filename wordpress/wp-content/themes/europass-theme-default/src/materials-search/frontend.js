console.log('LOADED SEARCH!');

document.addEventListener('DOMContentLoaded', function () {
	const searchBlock = document.querySelector('.search-block');
	if (!searchBlock) return;

	const input = searchBlock.querySelector('.search-block__input');
	const emptyMessage = searchBlock.querySelector('.search-block__empty-message');
	const cards = document.querySelectorAll('.file-card');

	if (!input || !emptyMessage) return;

	input.addEventListener('input', function () {
		const query = this.value.trim().toLowerCase();

		let visibleCount = 0; 

		cards.forEach(card => {
			const text = card.textContent.toLowerCase();

			const matches = text.includes(query);
			card.style.display = matches ? '' : 'none';

			if (matches) visibleCount++;
		});

		emptyMessage.style.display = visibleCount === 0 ? 'block' : 'none';
	});
});
