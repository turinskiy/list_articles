import { ArticleRow } from './ArticleRow'
import './styles/common_styles.css';
import './styles/articles.css';

export function ArticleList(props) {
	const { articles, handleUpdateTitle, handleDeleteArticle } = props;

	console.log('render ArticleList')
	return !articles || articles.length === 0 ? null : (
		<div className="column grow1 container">
			{articles.map((item, index) => (
				item.columns.length === 0 
					? null 
					: <ArticleRow data={item} key={index} row={index} handleUpdateTitle={handleUpdateTitle} handleDeleteArticle={handleDeleteArticle} />
			))}
		</div>
	)
}