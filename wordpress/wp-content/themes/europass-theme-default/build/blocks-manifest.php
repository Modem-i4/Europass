<?php
// This file is generated. Do not modify it manually.
return array(
	'add-block-btn' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 2,
		'name' => 'parts-blocks/add-block-btn',
		'title' => 'Додати блок нижче',
		'category' => 'parts-blocks',
		'icon' => 'plus',
		'description' => 'Кнопка для додавання блоку за іменем під собою',
		'supports' => array(
			'html' => false,
			'lock' => true
		),
		'attributes' => array(
			'lock' => array(
				'type' => 'object',
				'default' => array(
					'move' => true,
					'remove' => true
				)
			),
			'blockName' => array(
				'type' => 'string',
				'default' => 'parts-blocks/materials-card'
			),
			'buttonLabel' => array(
				'type' => 'string',
				'default' => '➕ додати матеріал'
			)
		),
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
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
	'materials-card' => array(
		'apiVersion' => 2,
		'name' => 'parts-blocks/materials-card',
		'title' => 'Картка з файлом',
		'category' => 'parts-blocks',
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
		'name' => 'parts-blocks/search-entries',
		'title' => 'Пошук у блоках',
		'category' => 'parts-blocks',
		'icon' => 'search',
		'description' => 'Динамічний пошук по полях інших блоків у редакторі',
		'attributes' => array(
			'targetBlocks' => array(
				'type' => 'string',
				'default' => '.qa-item'
			)
		),
		'supports' => array(
			'html' => false
		),
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./frontend.js'
	),
	'news-slider' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'design-blocks/news-slider',
		'version' => '0.1.0',
		'title' => 'Слайдер новин',
		'category' => 'design-blocks',
		'icon' => 'slides',
		'description' => 'Глобальний блок-слайдер для новин',
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'postsToShow' => array(
				'type' => 'number',
				'default' => 6
			),
			'slidesPerView' => array(
				'type' => 'number',
				'default' => 3
			),
			'slidesGapPx' => array(
				'type' => 'number',
				'default' => 25
			),
			'fallbackImage' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./script.css',
			'file:./style-index.css'
		),
		'viewScript' => 'file:./script.js',
		'render' => 'file:./render.php'
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
	'qa-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'design-blocks/qa-block',
		'title' => 'Блок Q&A',
		'category' => 'design-blocks',
		'icon' => 'editor-help',
		'description' => 'Питання‑відповідь з анімованою стрілкою та акордеоном.',
		'version' => '0.1.0',
		'keywords' => array(
			'faq',
			'q&a',
			'accordion'
		),
		'supports' => array(
			'html' => false,
			'spacing' => array(
				'margin' => true,
				'padding' => true
			)
		),
		'attributes' => array(
			'question' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.qa-question'
			),
			'answer' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.qa-answer'
			),
			'open' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'editorScript' => 'file:./index.js',
		'viewScript' => 'file:./frontend.js',
		'style' => 'file:./style-index.css'
	)
);
