import { useEffect, useState } from 'react';
import { Title } from './Title';
import { Button } from './buttons/Button';

export function ArticleCell(props) {
	const { content, row, col } = props;
	const [isDelClicked, setIsDelClicked] = useState(false);
	const [timeoutId, setTimeoutId] = useState(null);

	let width = Math.floor(content.width * 100 / 12);

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

	// useEffect(() => {});

	console.log('render ArticleCell')
	return (
		<div className="article-block" style={{ width: `${width}%`, maxWidth: `${width}%` }}>
			<div className="column article">
			<div className="column article-overlay" data-is-displayed={isDelClicked}>
				<div className="column grow1">
					<Button titleText="Cancel" onClickHandler={cancelDelete} className="button-cancel" />
				</div>
			</div>
				{/* Image */}
				<div className="column grow1">
					<div className="cell-image">
						<img src={content.imageUrl} alt={content.title} />
					</div>
				</div>

				<div className="column grow0">
					{/* Title */}
					<Title url={content.url} title={content.title} onTitleUpdate={onTitleUpdate} />

					{/* Delete Button */}
					<div className="button-block grow0">
						<Button titleText="Delete Article" onClickHandler={onArticleDelete} />
					</div>
				</div>
			</div>
		</div>
	);
}
