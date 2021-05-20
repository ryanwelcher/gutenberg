<?php
/**
 * Registers the `core/more-from-author` block on server.
 */
function register_block_core_more_from_author() {
	register_block_type_from_metadata(
		__DIR__ . '/more-from-author',
		array(
			'render_callback' => 'render_block_core_more_from_author',
		)
	);
}
add_action( 'init', 'register_block_core_more_from_author' );

/**
 * Renders the `core/more-from-author` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with latest posts added.
 */
function render_block_core_more_from_author( $attributes, $content, $block ) {
	// We need the post ID to be able to get the author.
	if ( ! isset( $block->context['postId'] ) ) {
		return '';
	}

	$post_id = intval( $block->context['postId'] );
	$more_posts = new \WP_Query(
		array(
			'post_type'      => get_post_type( $post_id ),
			'posts_per_page' => 3,
			'no_found_rows'  => true,
			'fields'         => 'ids',
			'post__not_in'   => array( $post_id ),
		)
	);

	if ( ! $more_posts->have_posts() ) {
		return '';
	}
	$title = isset( $attributes['title'] ) ? $attributes['title'] : __( 'More from this author' );
	ob_start(); ?>
		<section>
			<h3><?php echo esc_html( $title ); ?></h3>
			<ul>
				<?php foreach ( $more_posts->posts as $related_post_id ) : ?>
				<li>
					<a href="<?php echo esc_url( get_permalink( $related_post_id ) );?>">
						<?php echo get_the_title( $related_post_id ); ?>
					</a>
				</li>
				<?php endforeach; ?>
			</ul>
		</section>
	<?php
	return ob_get_clean();
}
