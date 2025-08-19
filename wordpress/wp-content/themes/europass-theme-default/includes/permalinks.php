<?php
// 1) Рерайти тільки для пустого пошуку: /search і /search/page/N
add_action('init', function () {
    if (!get_option('permalink_structure')) return;

    add_rewrite_rule('^search/?$', 'index.php?s=', 'top');
    add_rewrite_rule('^search/page/([0-9]{1,})/?$', 'index.php?s=&paged=$matches[1]', 'top');
});

// 2) Формування посилань пошуку:
//    - пустий запит -> /search
//    - будь-який інший -> ?s=...
add_filter('search_link', function($link, $query){
    $q = trim((string) $query);

    // Без пермалінків — лишаємо як є
    if (!get_option('permalink_structure')) {
        // але порожній — гарантуємо ?s= (щоб показало все)
        return ($q === '') ? add_query_arg('s', '', home_url('/')) : $link;
    }

    // З пермалінками: порожній -> /search, інші -> ?s=...
    if ($q === '') {
        return home_url(user_trailingslashit('search'));
    }
    return add_query_arg('s', $q, home_url('/'));
}, 10, 2);

// 3) Переадресація тільки для ПУСТОГО ?s= на /search (+ підтримка пагінації)
add_action('template_redirect', function () {
    if (is_admin() || defined('REST_REQUEST')) return;
    if (!isset($_GET['s']) || !get_option('permalink_structure')) return;

    $q = trim((string) wp_unslash($_GET['s']));
    if ($q !== '') return; // не чіпаємо нормальні ?s=запити

    // Ціль: /search або /search/page/N/
    $pretty = home_url(user_trailingslashit('search'));
    $paged  = get_query_var('paged');
    if (!$paged && isset($_GET['paged'])) $paged = (int) $_GET['paged'];
    if ($paged > 1) $pretty = trailingslashit($pretty) . 'page/' . $paged . '/';

    $scheme  = is_ssl() ? 'https://' : 'http://';
    $current = $scheme . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

    if (rtrim($current, '/') !== rtrim($pretty, '/')) {
        wp_safe_redirect($pretty, 301);
        exit;
    }
});

// 4) Хак для "порожнього пошуку": змушує WP вважати його пошуком і показувати ВСІ записи (з пагінацією)
add_filter('request', function($vars){
    if (isset($vars['s']) && trim((string)$vars['s']) === '') {
        // Пробіл зберігає стан пошуку і дає "пошук по всьому"
        $vars['s'] = ' ';
        // За потреби обмеж: $vars['post_type'] = 'post';
    }
    return $vars;
});

// 5) Флаш рерайтів при активації теми
add_action('after_switch_theme', function(){ flush_rewrite_rules(); });
