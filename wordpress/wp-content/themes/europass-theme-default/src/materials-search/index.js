import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { TextControl, PanelBody } from '@wordpress/components';
import './style.scss';

registerBlockType('custom/search-entries', {
	edit: ({ attributes, setAttributes }) => {
		const { targetBlocks, searchFields } = attributes;

		return (
			<div {...useBlockProps({ className: 'search-block' })}>
				<input
					type="search"
					className="search-block__input"
					placeholder="Пошук…"
					disabled
				/>

				<InspectorControls>
					<PanelBody title="Налаштування пошуку" initialOpen={true}>
						<TextControl
							label="Типи блоків (через кому)"
							help="Наприклад: custom/file-card"
							value={targetBlocks}
							onChange={(val) => setAttributes({ targetBlocks: val })}
						/>
						<TextControl
							label="Поля для пошуку (через кому)"
							help="Наприклад: title,file"
							value={searchFields}
							onChange={(val) => setAttributes({ searchFields: val })}
						/>
					</PanelBody>
				</InspectorControls>
			</div>
		);
	},

	save: ({ attributes }) => {
		const { targetBlocks, searchFields } = attributes;

		return (
			<div
				className="search-block"
				data-target-blocks={targetBlocks}
				data-search-fields={searchFields}
			>
				<input
					type="search"
					className="search-block__input"
					placeholder="Пошук…"
				/>
				<div className="search-block__empty-message" style={{ display: 'none' }}>
					Нічого не знайдено
				</div>
			</div>
		);
	}

});
