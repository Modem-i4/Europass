import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, MediaUpload, MediaUploadCheck, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody } from '@wordpress/components';
import metadata from './block.json';
import './frontend.js';
import './style.scss';

registerBlockType( metadata.name, {
  edit: ({ attributes, setAttributes }) => {
	const { imageUrl } = attributes;

	const onSelectImage = (media) => {
		setAttributes({ imageUrl: media.url });
	};

	return (
		<>
		<InspectorControls>
			<PanelBody title="Image Settings" initialOpen={true}>
			<MediaUploadCheck>
				<MediaUpload
				onSelect={onSelectImage}
				allowedTypes={['image']}
				value={imageUrl}
				render={({ open }) => (
					<Button onClick={open} variant="secondary">
					{imageUrl ? 'Change Image' : 'Choose Image'}
					</Button>
				)}
				/>
			</MediaUploadCheck>
			</PanelBody>
		</InspectorControls>

		<div {...useBlockProps({ className: 'custom-image-block' })}>
			{imageUrl && <img src={imageUrl} alt="Selected" />}
			<div className="overlay-inner">
			<InnerBlocks />
			</div>
      		<div className="ellipse"></div>
			<button id='clickable'>натисни</button>
		</div>
		</>
	);
	},

  save: ({ attributes }) => {
    const { imageUrl } = attributes;
    return (
		<>
		<a href="/?page_id=9" class="card-link">
			<div class="card">
			<h3>Заголовок</h3>
			<p>Опис картки або будь-який вміст усередині діву.</p>
			</div>
		</a>
		<div className="custom-image-block">
			<a href="/?page_id=9">
			{imageUrl && <img src={imageUrl} alt="Selected" />}
					<div className="overlay-inner">
					<InnerBlocks.Content />
					</div>
					<div className="ellipse"></div>
			</a>
		</div>
		<button id='clickable'>натисни</button>
	  </>
    );
  }
});

