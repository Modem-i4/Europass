<?php
// This file is generated. Do not modify it manually.
return array(
	'examp-full' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'custom-blocks/examp-full',
		'version' => '0.1.0',
		'title' => 'Example Block',
		'category' => 'custom-blocks',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'examp-full',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	),
	'examp-full-2' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'custom-blocks/examp-full-2',
		'version' => '0.1.0',
		'title' => 'Example Block 2',
		'category' => 'custom-blocks',
		'icon' => 'smiley',
		'description' => 'OPYS.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'examp-full-2',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	),
	'hero-circle-overlayed' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'common/hero-circle-overlayed',
		'version' => '0.1.0',
		'title' => 'Hero Circle Overlayed',
		'category' => 'common',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'imageUrl' => array(
				'type' => 'string'
			)
		),
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./frontend.js'
	),
	'materials-add' => array(
		'apiVersion' => 2,
		'name' => 'custom/add-material-button',
		'title' => 'Додати матеріал',
		'category' => 'common',
		'icon' => 'plus',
		'description' => 'Кнопка для додавання нового блоку матеріалу',
		'supports' => array(
			'html' => false
		),
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'materials-card' => array(
		'apiVersion' => 2,
		'name' => 'custom/file-card',
		'title' => 'Картка з файлом',
		'category' => 'common',
		'icon' => 'media-document',
		'description' => 'Картка з назвою, зображенням та файлом.',
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => ''
			),
			'file' => array(
				'type' => 'string',
				'default' => ''
			),
			'imageUrl' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'supports' => array(
			'html' => false
		),
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'materials-search' => array(
		'apiVersion' => 2,
		'name' => 'custom/search-entries',
		'title' => 'Пошук у блоках',
		'category' => 'common',
		'icon' => 'search',
		'description' => 'Динамічний пошук по полях інших блоків у редакторі',
		'attributes' => array(
			'targetBlocks' => array(
				'type' => 'string',
				'default' => 'custom/file-card'
			),
			'searchFields' => array(
				'type' => 'string',
				'default' => 'title'
			)
		),
		'supports' => array(
			'html' => false
		),
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./frontend.js'
	),
	'php-example-block' => array(
		'apiVersion' => 2,
		'name' => 'custom-blocks/php-example',
		'title' => 'PHP Example Block',
		'description' => 'An example block using PHP.',
		'category' => 'custom-blocks',
		'icon' => 'slides',
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'numberOfPosts' => array(
				'type' => 'number',
				'default' => 3
			)
		),
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'search-button-img' => array(
		'apiVersion' => 2,
		'name' => 'custom-blocks/search-button-img',
		'title' => 'Search Button with Image',
		'category' => 'custom-blocks',
		'icon' => 'search',
		'description' => 'Кнопка з SVG або зображенням пошуку',
		'attributes' => array(
			'url' => array(
				'type' => 'string',
				'default' => ''
			),
			'themeUrl' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'supports' => array(
			'inserter' => true
		),
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style.css',
		'editorStyle' => 'file:./editor.scss'
	)
);
