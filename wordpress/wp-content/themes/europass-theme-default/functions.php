<?php

function register_custom_block_category( $categories ) {
    $new_category = array(
        'slug'  => 'custom-blocks',
        'title' => __( 'Кастомні блоки', 'custom-blocks' ),
        'icon'  => 'star-filled',
    );
    array_unshift( $categories, $new_category );
    return $categories;
}
add_filter( 'block_categories_all', 'register_custom_block_category', 10, 1 );

function init_custom_blocks() {
    wp_register_block_types_from_metadata_collection(
    __DIR__ . '/build',
    __DIR__ . '/build/blocks-manifest.php'
);
}
add_action('init', 'init_custom_blocks' );

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style(
        'mytheme-style',
        get_template_directory_uri() . '/css/style.css',
        [],
        filemtime(get_template_directory() . '/css/style.css')
    );
});

add_action('after_setup_theme', function () {
    add_theme_support('editor-styles');
    add_editor_style('css/style.css');
});

function allow_svg_uploads( $mimes ) {
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}
add_filter( 'upload_mimes', 'allow_svg_uploads' );


add_action('wp_enqueue_scripts', function () {
	wp_enqueue_script(
		'europass-theme-main-js',
		get_template_directory_uri() . '/js/index.js',
		[],
		filemtime(get_template_directory() . '/js/index.js'),
		true
	);

	// Додаємо атрибут type="module"
	add_filter('script_loader_tag', function ($tag, $handle, $src) {
		if ($handle === 'europass-theme-main-js') {
			$tag = '<script type="module" src="' . esc_url($src) . '"></script>';
		}
		return $tag;
	}, 10, 3);
});
