<?php
$posts_to_show = $attributes['postsToShow'] ?? 6;
$slides_per_view = $attributes['slidesPerView'] ?? 2;
$fallback_image = !empty($attributes['fallbackImage']) ? esc_url($attributes['fallbackImage']) : '';

$args = [
  'post_type' => 'post',
  'posts_per_page' => $posts_to_show,
  'post_status' => 'publish',
];

$loop = new WP_Query($args);

if ($loop->have_posts()) :
?>
  <div class="swiper-container">
    <div class="news-slider swiper" data-slides-per-view="<?php echo esc_attr($slides_per_view); ?>">
      <div class="swiper-wrapper">
        <?php while ($loop->have_posts()) : $loop->the_post(); ?>
          <div class="news-latest-card swiper-slide">
              <div class="card-image-wrapper">
                <?php if ( has_post_thumbnail() ) : ?>
                  <?php the_post_thumbnail( 'medium', ['class' => 'card-image'] ); ?>
                <?php elseif ( $fallback_image ) : ?>
                  <img src="<?php echo $fallback_image; ?>" alt="<?php the_title_attribute(); ?>" class="card-image" />
                <?php else : ?>
                  <div class="card-image-placeholder"></div>
                <?php endif; ?>
              </div>

            <div class="card-gradient-bar"></div>

            <div class="card-content">
              <h3 class="card-title"><?php the_title(); ?></h3>
              <div class="card-meta">
                <div class="card-type">
                  <?php
                    $categories = get_the_category();
                    echo ($categories && $categories[0]) ? esc_html($categories[0]->name) : 'Публікація';
                  ?>
                </div>
                <div class="card-date">
                  <?php
                    $date_diff = human_time_diff(get_the_time('U'), current_time('timestamp'));
                    echo esc_html($date_diff . ' тому');
                  ?>
                </div>
              </div>
            </div>
          </div>
        <?php endwhile; ?>
      </div>
    </div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-pagination"></div>
  </div>
<?php
endif;
wp_reset_postdata();
?>
 