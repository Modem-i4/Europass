<?php
add_action('init', function () {
    add_rewrite_rule('^search/([^/]+)/?$', 'index.php?s=$matches[1]', 'top');
    add_rewrite_rule('^search/([^/]+)/page/([0-9]{1,})/?$', 'index.php?s=$matches[1]&paged=$matches[2]', 'top');
});

add_filter('search_link', function($link, $query){
    if (!get_option('permalink_structure')) return $link;
    $base = home_url(user_trailingslashit('search'));
    $q = trim((string)$query);
    return $q === '' ? $base : home_url(user_trailingslashit('search/' . rawurlencode($q)));
}, 10, 2);

add_action('template_redirect', function () {
    if (is_admin() || defined('REST_REQUEST')) return;
    if (!isset($_GET['s']) || !get_option('permalink_structure')) return;

    $q = trim((string) wp_unslash($_GET['s']));
    $pretty = $q === ''
        ? home_url(user_trailingslashit('search'))
        : home_url(user_trailingslashit('search/' . rawurlencode($q)));

    $paged = get_query_var('paged');
    if (!$paged && isset($_GET['paged'])) $paged = (int) $_GET['paged'];
    if ($paged > 1) $pretty = trailingslashit($pretty) . 'page/' . $paged . '/';

    $current = ((is_ssl() ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
    if (rtrim($current, '/') !== rtrim($pretty, '/')) {
        wp_safe_redirect($pretty, 301);
        exit;
    }
});

add_action('after_switch_theme', function(){ flush_rewrite_rules(); });
