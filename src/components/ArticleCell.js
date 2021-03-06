import { useState } from 'react';
import { Title } from './Title';
import { Button } from './buttons/Button';
import { getValueFromUrl } from '../services/articles';

export function ArticleCell(props) {
	const { content, row, col } = props;
	const [isDelClicked, setIsDelClicked] = useState(false);
	const [timeoutId, setTimeoutId] = useState(null);

	let articleWidth = Math.floor(content.width * 100 / 12);
	let imageHeight = getValueFromUrl(content.imageUrl, '&height=');
	let imageWidth = getValueFromUrl(content.imageUrl, '&width=');
	
	function onTitleUpdate(event, title) {
		props.handleUpdateTitle(event, row, col, title)
	}
	
	function onArticleDelete() {
		// Show overlay
		setIsDelClicked(true);

		let id = setTimeout(() => {
			setIsDelClicked(false);
			props.handleDeleteArticle(row, col);
		}, 3000);

		setTimeoutId(id);
	}

	function cancelDelete() {
		timeoutId && clearTimeout(timeoutId);
		setTimeoutId(null);
		setIsDelClicked(false);
	}

	return (
		<div className="article-block" style={{ width: `${articleWidth}%`, maxWidth: `${articleWidth}%` }}>
			<div className="column article">

				{/* Overlay */}
				<div className="column article-overlay" data-is-displayed={isDelClicked}>
					<Button titleText="Cancels the deletion" onClickHandler={cancelDelete} />
				</div>

				{/* Delete Button */}
				<Button titleText="Delete Article" onClickHandler={onArticleDelete} alignment="flex-end" className="danger-button" />

				{/* Picture */}
				<div className="column grow1">
					<div className="cell-image">
						<img src={content.imageUrl} alt={content.title} width={imageWidth} height={imageHeight} />
					</div>
				</div>

				<div className="column grow0">
					{/* Title */}
					<Title url={content.url} title={content.title} onTitleUpdate={onTitleUpdate} />
				</div>
			</div>
		</div>
	);
}
