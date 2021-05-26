import { ArticleRow } from './ArticleRow'
import './styles/common_styles.css';
import './styles/articles.css';

export function ArticleList(props) {
	const {articles} = props;

	return !articles || articles.length === 0 ? null : (
		<div className="column grow1 container">
			{articles.map((item, index) => (
				<ArticleRow data={item} key={index} />
			))}
		</div>
	)
}