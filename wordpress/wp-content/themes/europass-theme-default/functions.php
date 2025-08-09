<?php

function register_custom_block_categories( $categories ) {
    $new_categories = array(
        array(
            'slug'  => 'design-blocks',
            'title' => __( 'Легкий пизайн', 'design-blocks' ),
            'icon'  => 'star-filled',
        ),
        array(
            'slug'  => 'page-blocks',
            'title' => __( 'Блоки сторінок', 'page-blocks' ),
            'icon'  => 'layout',
        ),
        array(
            'slug'  => 'parts-blocks',
            'title' => __( 'Складові блоки', 'parts-blocks' ),
            'icon'  => 'archive',
        ),
    );

    return array_merge( $new_categories, $categories );
}
add_filter( 'block_categories_all', 'register_custom_block_categories', 10, 1 );

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
