import { Title } from './Title';

export function ArticleCell(props) {
	const { content, row, cell } = props;
	let width = Math.floor(content.width * 100 / 12);

	return (
		<div className="article-block" style={{ width: `${width}vw` }}>
			<div className="column article">
			<span>{`[${row}][${cell}]`}</span>
				{/* Image */}
				<div className="column grow1">
					<div className="cell-image">
						<img src={content.imageUrl} alt={content.title} />
					</div>
				</div>

				<div className="column grow0">
					{/* Title */}
					<Title url={content.url} title={content.title} />

					{/* Delete Button */}
					<div className="button-block grow0">
						<button className="button">{'Del'}</button>
					</div>
				</div>
			</div>
		</div>
	);
}
