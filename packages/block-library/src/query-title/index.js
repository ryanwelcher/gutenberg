/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import variations from './variations';

const { name } = metadata;
export { metadata, name };

export const settings = {
	edit,
	variations,
};
