import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { url } = attributes;

	

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title="Налаштування посилання">
					<TextControl
						label="Посилання"
						value={url}
						onChange={(newUrl) => setAttributes({ url: newUrl })}
						placeholder="https://example.com"
					/>
				</PanelBody>
			</InspectorControls>

			<a href={url || '#'} className="search-button" target="_blank" rel="noopener noreferrer">
				<img
					src={`/wp-content/themes/europass-theme-default/assets/images/search-icon.svg`}
					alt="Пошук"
					width="24"
					height="24"
				/>
			</a>
		</div>
	);
}