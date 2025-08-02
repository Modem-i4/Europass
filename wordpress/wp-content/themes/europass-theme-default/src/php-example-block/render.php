<?php
$posts = get_posts([
    'numberposts' => $attributes['numberOfPosts'] ?? 3,
]);
?>

<div class="my-dynamic-block">
    <?php foreach ( $posts as $post ): ?> 
        <article>
            <h3><?= $post->post_title ?></h3>
            <p><?=$post->post_content ?></p>
        </article>
    <?php endforeach; ?>
</div>



