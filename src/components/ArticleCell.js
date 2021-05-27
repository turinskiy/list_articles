import { Title } from './Title';
import { Button } from './buttons/Button';

export function ArticleCell(props) {
	const { content, row, col } = props;
	let width = Math.floor(content.width * 100 / 12);

	function onTitleUpdate(event, title) {
		props.handleUpdateTitle(event, row, col, title)
	}

	function onArticleDelete() {
		props.handleDeleteArticle(row, col);
	}

	return (
		<div className="article-block" style={{ width: `${width}%`, maxWidth: `${width}%` }}>
			<div className="column article">
			<span>{`width: ${width} [${row}][${col}]`}</span>
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
						<Button onArticleDelete={onArticleDelete} />
					</div>
				</div>
			</div>
		</div>
	);
}
