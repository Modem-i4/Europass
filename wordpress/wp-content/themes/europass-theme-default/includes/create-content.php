<?php
add_action('after_switch_theme', function () {
    $pages = array(
        array(
            'slug'        => 'search',
            'title'       => 'Пошук',
            'status'      => 'publish',
            'template'    => 'page',
            'parent_slug' => '',
            'menu_order'  => 10,
        ),
        array(
            'slug'  => 'home',
            'title' => 'Головна',
            'menu_order'  => 1,
        ),
        array(
            'slug'  => 'europass',
            'title' => 'ПРО EUROPASS',
            'menu_order'  => 2,
        ),
        array(
            'slug'  => 'about',
            'title' => 'Про Europass',
            'parent_slug' => 'europass',
            'menu_order'  => 4,
        ),
        array(
            'slug'  => 'library',
            'title' => 'Бібліотека матеріалів',
            'parent_slug' => 'europass',
            'menu_order'  => 5,
        ),
        array(
            'slug'  => 'useful-links',
            'title' => 'Корисні посилання',
            'parent_slug' => 'europass',
            'menu_order'  => 6,
        ),
        array(
            'slug'  => 'instruments',
            'title' => 'ІНСТРУМЕНТИ EUROPASS',
            'menu_order'  => 3,
        ),
        array(
            'slug'  => 'profile-europass',
            'title' => 'Профіль Europass',
            'parent_slug' => 'instruments',
            'menu_order'  => 7,
        ),
        array(
            'slug'  => 'resume',
            'title' => 'Резюме',
            'parent_slug' => 'instruments',
            'menu_order'  => 8,
        ),
        array(
            'slug'  => 'cover-letter',
            'title' => 'Супровідний лист',
            'parent_slug' => 'instruments',
            'menu_order'  => 9,
        ),
        array(
            'slug'  => 'diploma-supplement',
            'title' => 'Додаток до диплому',
            'parent_slug' => 'instruments',
            'menu_order'  => 10,
        ),
        array(
            'slug'  => 'certificate-supplement',
            'title' => 'Додаток до сертифіката',
            'parent_slug' => 'instruments',
            'menu_order'  => 11,
        ),
        array(
            'slug'  => 'national-centres',
            'title' => 'Національні центри Europass',
            'parent_slug' => 'instruments',
            'menu_order'  => 12,
        ),
        array(
            'slug'  => 'mobility-passport',
            'title' => 'Паспорт мобільності',
            'parent_slug' => 'instruments',
            'menu_order'  => 13,
        ),
    );

    foreach ($pages as $p) {
        $slug        = !empty($p['slug']) ? sanitize_title($p['slug']) : '';
        $title       = isset($p['title']) ? $p['title'] : '';
        $status      = isset($p['status']) ? $p['status'] : 'publish';
        $template    = isset($p['template']) ? $p['template'] : '';
        $parent_slug = !empty($p['parent_slug']) ? sanitize_title($p['parent_slug']) : '';
        $menu_order  = isset($p['menu_order']) ? intval($p['menu_order']) : 0;

        if (!$slug || !$title) continue;

        // шукаємо/визначаємо батька
        $parent_id = 0;
        if ($parent_slug) {
            $parent = get_page_by_path($parent_slug);
            if ($parent && $parent->post_type === 'page') {
                $parent_id = intval($parent->ID);
            }
        }

        // шукаємо сторінку ЗА ПОВНИМ ШЛЯХОМ (важливо для дочірніх)
        $full_path = ($parent_slug ? $parent_slug.'/' : '') . $slug;
        $existing  = get_page_by_path($full_path);

        if (!$existing) {
            // контент з файлу: підтримка вкладених шляхів
            $content_rel = ($parent_slug ? $parent_slug.'/' : '') . $slug . '.html';
            $content_path = trailingslashit(get_stylesheet_directory()) . 'pages/' . $content_rel;
            $content = file_exists($content_path) ? file_get_contents($content_path) : '';

            $post_id = wp_insert_post(array(
                'post_type'    => 'page',
                'post_status'  => $status,
                'post_title'   => $title,
                'post_name'    => $slug,
                'post_parent'  => $parent_id,
                'menu_order'   => $menu_order,
                'post_content' => $content,
                'comment_status' => 'closed',
                'ping_status'    => 'closed',
            ));

            if ($post_id && $template !== '') {
                update_post_meta($post_id, '_wp_page_template', $template);
            }
        } else {
            $post_id = intval($existing->ID);
            $update  = array('ID' => $post_id);
            $do_update = false;

            if ($existing->post_status !== $status)               { $update['post_status'] = $status;       $do_update = true; }
            if (intval($existing->post_parent) !== $parent_id)     { $update['post_parent'] = $parent_id;    $do_update = true; }
            if (intval($existing->menu_order)  !== $menu_order)    { $update['menu_order']  = $menu_order;   $do_update = true; }
            if ($existing->post_title !== $title)                  { $update['post_title']  = $title;        $do_update = true; }

            if ($do_update) wp_update_post($update);

            if ($template !== '') {
                update_post_meta($post_id, '_wp_page_template', $template);
            } else {
                // очистити кастомний шаблон, якщо був
                delete_post_meta($post_id, '_wp_page_template');
            }
        }
    }

    // гарантуємо коректні пермалінки
    flush_rewrite_rules(false);
});