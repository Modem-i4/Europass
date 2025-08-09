<?php
add_action('after_switch_theme', function () {
    $pages = array(
        array(
            'slug'        => 'search',
            'title'       => 'Пошук',
            'status'      => 'publish',
            'template'    => 'page',
            'parent_slug' => '',
            'menu_order'  => 0,
        ),
    );

    foreach ($pages as $p) {
        $slug        = isset($p['slug']) ? sanitize_title($p['slug']) : '';
        $title       = isset($p['title']) ? $p['title'] : '';
        $status      = isset($p['status']) ? $p['status'] : 'publish';
        $template    = isset($p['template']) ? $p['template'] : '';
        $parent_slug = isset($p['parent_slug']) ? $p['parent_slug'] : '';
        $menu_order  = isset($p['menu_order']) ? intval($p['menu_order']) : 0;

        if (!$slug || !$title) continue;

        $parent_id = 0;
        if ($parent_slug) {
            $parent = get_page_by_path($parent_slug);
            if ($parent && $parent->post_type === 'page') $parent_id = intval($parent->ID);
        }

        $existing = get_page_by_path($slug);
        if (!$existing) {
            $content_path = trailingslashit(get_template_directory()) . 'pages/' . $slug . '.html';
            $content = file_exists($content_path) ? file_get_contents($content_path) : '';

            $post_id = wp_insert_post(array(
                'post_type'    => 'page',
                'post_status'  => $status,
                'post_title'   => $title,
                'post_name'    => $slug,
                'post_parent'  => $parent_id,
                'menu_order'   => $menu_order,
                'post_content' => $content,
            ));

            if ($post_id && $template !== '') {
                update_post_meta($post_id, '_wp_page_template', $template);
            }
        } else {
            $post_id = intval($existing->ID);
            $update  = array('ID' => $post_id);
            $do_update = false;

            if ($existing->post_status !== $status) { $update['post_status'] = $status; $do_update = true; }
            if (intval($existing->post_parent) !== $parent_id) { $update['post_parent'] = $parent_id; $do_update = true; }
            if (intval($existing->menu_order) !== $menu_order) { $update['menu_order'] = $menu_order; $do_update = true; }
            if ($do_update) wp_update_post($update);

            if ($template !== '') update_post_meta($post_id, '_wp_page_template', $template);
        }
    }
});
