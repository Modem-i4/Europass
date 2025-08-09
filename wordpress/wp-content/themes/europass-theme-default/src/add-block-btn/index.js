import { registerBlockType, createBlock } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { PanelBody, TextControl, Button } from '@wordpress/components';
import metadata from './block.json';
import './style.scss';

registerBlockType(metadata.name, {
	edit: ({ attributes, setAttributes, clientId }) => {
		const { blockName, buttonLabel } = attributes;
		const blockProps = useBlockProps();

		const { insertBlocks } = useDispatch('core/block-editor');
		const { getBlockIndex, getBlockRootClientId } = useSelect(
			(select) => select('core/block-editor'),
			[]
		);

		const handleAdd = () => {
			const newBlock = createBlock(blockName);
			const rootClientId = getBlockRootClientId(clientId);
			const index = getBlockIndex(clientId, rootClientId);
			insertBlocks(newBlock, index + 1, rootClientId);
		};

		return (
			<>
				<InspectorControls>
					<PanelBody title="Налаштування кнопки">
						<TextControl
							label="Назва блоку для додавання"
							value={blockName}
							onChange={(val) => setAttributes({ blockName: val })}
						/>
						<TextControl
							label="Текст кнопки"
							value={buttonLabel}
							onChange={(val) => setAttributes({ buttonLabel: val })}
						/>
					</PanelBody>
				</InspectorControls>

				<div {...blockProps} className="add-block-btn">
					<Button variant="primary" onClick={handleAdd}>
						{buttonLabel}
					</Button>
				</div>
			</>
		);
	},

	save: () => null,
});
