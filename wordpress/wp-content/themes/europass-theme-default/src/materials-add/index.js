import { registerBlockType, createBlock } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { Button } from '@wordpress/components';
import metadata from './block.json';
import './style.scss';

registerBlockType(metadata.name, {
	edit: ({ clientId }) => {
		const blockProps = useBlockProps();

		const { insertBlocks } = useDispatch('core/block-editor');
		const { getBlockIndex, getBlockRootClientId } = useSelect(
			(select) => select('core/block-editor'),
			[]
		);

		const handleAdd = () => {
			const newBlock = createBlock('custom/file-card');
			const index = getBlockIndex(clientId);
			const rootClientId = getBlockRootClientId(clientId);

			insertBlocks(newBlock, index + 1, rootClientId);
		};

		return (
			<div {...blockProps} className="add-material-button">
				<Button variant="primary" onClick={handleAdd}>
					➕ додати матеріал
				</Button>
			</div>
		);
	},

	save: () => null,
});
