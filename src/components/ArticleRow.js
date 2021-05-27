import { ArticleCell } from './ArticleCell'

export function ArticleRow(props) {
	const { data, row, handleUpdateTitle, handleDeleteArticle } = props;

	// console.log('render ArticleRow', data)
	return data.columns.length === 0 ? null : <div className="row min-height">
		{data.columns.map((item, index) => {
			return <ArticleCell content={item} key={index} row={row} col={index} handleUpdateTitle={handleUpdateTitle} handleDeleteArticle={handleDeleteArticle} />
		})}
	</div>;
}