document.addEventListener('click', function (e) {
    const menuContainer = document.querySelector('.wp-block-navigation__responsive-container');
    if (!menuContainer) return;

    // якщо меню відкрите і клік поза його вмістом
    if (menuContainer.classList.contains('is-menu-open') &&
        !menuContainer.querySelector('.wp-block-navigation__responsive-dialog').contains(e.target)
    ) {
        // імітуємо дію стандартного закриття
        menuContainer.querySelector('[data-wp-on-async--click="actions.closeMenuOnClick"]')?.click();
    }
});
