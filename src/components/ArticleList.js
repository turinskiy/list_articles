import { useEffect, useState } from "react";
import { ArticleRow } from './ArticleRow'
import './styles/common_styles.css';
import './styles/articles.css';

export function ArticleList(props) {
	const {articles} = props;
	// const [error, setError] = useState(null);
	// const [isLoaded, setIsLoaded] = useState(false);
	// const [articles, setArticles] = useState([]);

	// useEffect(() => {
	// 	setIsLoaded(false);

	// 	fetch('https://storage.googleapis.com/aller-structure-task/test_data.json')
	// 		.then(res => res.json())
	// 		.then(
	// 			(result) => {
	// 				// console.log(result[0])
	// 				setIsLoaded(true);
	// 				setArticles(result[0]);
	// 			},
	// 			(error) => {
	// 				setIsLoaded(true);
	// 				setError(error);
	// 			}
	// 		)
	// }, [])

	// if (error) {
	// 	return <div>{`Error: ${error.message}`}</div>
	// }
	// else if (!isLoaded) {
	// 	return <div>{'Loading...'}</div>
	// }

	return !articles || articles.length === 0 ? null : (
		<div className="column grow1 container">
			{articles.map((item, index) => (
				<ArticleRow data={item} key={index} />
			))}
		</div>
	)
}