/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import {
	Spinner,
	Placeholder,
	PanelBody,
	RangeControl,
} from '@wordpress/components';
import { pin } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

export default function MoreFromAuthorEdit( {
	attributes: { title, postCount },
	setAttributes,
} ) {
	const blockProps = useBlockProps();
	const morePosts = useSelect( ( select ) => {
		const { getCurrentUser, getEntityRecords } = select( coreStore );
		const { id } = getCurrentUser();
		return getEntityRecords( 'postType', 'post', {
			author: id,
			per_page: postCount,
		} );
	} );

	if ( ! Array.isArray( morePosts ) || ! morePosts.length ) {
		return (
			<div { ...blockProps }>
				<Placeholder
					icon={ pin }
					label={ __( 'More from this author' ) }
				>
					{ ! Array.isArray( morePosts ) ? (
						<Spinner />
					) : (
						__( 'No posts found.' )
					) }
				</Placeholder>
			</div>
		);
	}
	return (
		<section { ...blockProps }>
			<RichText
				tagName="h3"
				value={ title }
				allowedFormats={ [] }
				onChange={ ( newTitle ) =>
					setAttributes( { title: newTitle } )
				}
				placeholder={ __( 'Title…' ) }
			/>
			<ul>
				{ morePosts.map( ( { id, title: { raw: postTitle } } ) => {
					return <li key={ id }>{ postTitle }</li>;
				} ) }
			</ul>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label={ __( 'Number of Posts' ) }
						value={ postCount }
						onChange={ ( newPostCount ) =>
							setAttributes( { postCount: newPostCount } )
						}
						min="1"
						max="5"
					/>
				</PanelBody>
			</InspectorControls>
		</section>
	);
}
