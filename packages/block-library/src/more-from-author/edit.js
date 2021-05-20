/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function MoreFromAuthorEdit( {
	attributes: { title },
	setAttributes,
} ) {
	return (
		<div { ...useBlockProps() }>
			<RichText
				tagName="h3"
				value={ title }
				allowedFormats={ [] }
				onChange={ ( newTitle ) =>
					setAttributes( { title: newTitle } )
				}
			/>
		</div>
	);
}
