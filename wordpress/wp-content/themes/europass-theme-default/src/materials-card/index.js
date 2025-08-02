import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor';
import {
	Button,
	TextControl
} from '@wordpress/components';
import { trash } from '@wordpress/icons';
import metadata from './block.json';
import './style.scss';

registerBlockType(metadata.name, {
	edit: ({ attributes, setAttributes, isSelected, onReplace }) => {
		const { title, file, imageUrl } = attributes;

		const onSelectImage = (media) => {
			setAttributes({ imageUrl: media.url });
		};

		const onSelectFile = (media) => {
			setAttributes({ file: media.url });
		};

		const confirmDelete = () => {
			if (window.confirm('Ви справді хочете видалити цей блок?')) {
				onReplace([]);
			}
		};

		return (
			<div {...useBlockProps({ className: 'file-card-editor' })}>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={onSelectImage}
						allowedTypes={['image']}
						render={({ open }) => (
							<div className="thumbnail-wrapper" onClick={open}>
								{imageUrl ? (
									<img src={imageUrl} className="thumbnail" alt="Image" />
								) : (
									<div className="placeholder">🖼️</div>
								)}
							</div>
						)}
					/>
				</MediaUploadCheck>

				<div className="fields">
					<TextControl
						label="Назва"
						value={title}
						onChange={(val) => setAttributes({ title: val })}
					/>

					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectFile}
							allowedTypes={['application/pdf', 'application/msword']}
							render={({ open }) => (
								<Button onClick={open} variant="secondary">
									{file ? 'Змінити файл' : 'Обрати файл'}
								</Button>
							)}
						/>
					</MediaUploadCheck>
				</div>
				<Button
					className="remove-button"
					onClick={confirmDelete}
					icon={trash}
					label="Видалити"
				/>
			</div>
		);
	},

	save: ({ attributes }) => {
	const { title, imageUrl, file } = attributes;

	if (!file) return null;

	return (
		<a href={file} target="_blank" rel="noopener noreferrer" className="file-card">
			{imageUrl && (
				<img className="thumbnail" src={imageUrl} alt="" />
			)}
			{title && <div className="file-title">{title}</div>}
		</a>
	);
},


});
