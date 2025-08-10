import Edit from './edit';
import Save from './save';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType('custom-blocks/search-button-img', {
  edit: Edit,
  save: Save,
});