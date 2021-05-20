/**
 * WordPress dependencies
 */
import { postList as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';

const { name } = metadata;
export { metadata, name };

export const settings = {
	icon,
	example: {},
	edit,
};
