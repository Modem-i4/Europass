import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const { url, themeUrl } = attributes;

	return (
		<div {...useBlockProps.save()}>
			<a
				href={url || "#"}
				className="search-button"
				target="_blank"
				rel="noopener noreferrer"
			>
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
