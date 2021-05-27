import { useEffect, useState } from 'react';
import { checkStorageAvailability, loadAllArticles, saveAllArticles } from './services/storages';
import { loadArticlesByUrl } from './services/articles';
import { ArticleList } from './components/ArticleList';

import './App.css';

function App() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [articles, setArticles] = useState([]);
	const [isDataUpdated, setIsDataUpdated] = useState(false);

	function handleUpdateTitle(e, row, col, title) {
		// TODO: think of immutability
		articles[row].columns[col].title = title;
		// Save updated data into the Storage
		saveAllArticles(articles)
			.then(() => {
				console.info('All articles were saved into the localStorage')
			});
		setIsDataUpdated(prevState => !prevState);
	}

	function handleDeleteArticle(row, col) {
		articles[row].columns.splice(col, 1);
		setArticles(articles);

		// Save updated data into the Storage
		saveAllArticles(articles)
			.then(() => {
				console.info('All articles were saved into the localStorage')
			});
		setIsDataUpdated(prevState => !prevState);
	}

	useEffect(() => {
		console.log('useEffect onLoad')
		checkStorageAvailability();
		// Check if data exists in the storage
		let data = loadAllArticles();

		if (data) {
			setArticles(data);
			setIsLoaded(true);
		} else {
			loadArticlesByUrl()
				.then(res => res.json())
				.then((result) => {
					setArticles(result[0]);
					setIsLoaded(true);
					saveAllArticles(result[0])
						.then(() => {
							console.info('All articles were saved into the localStorage')
						});
				},
					(error) => {
						setIsLoaded(true);
						setError(error);
					}
				)
		}
	}, []);

	useEffect(() => {
		setIsLoaded(false);
		let data = loadAllArticles();
		if (data) {
			setArticles(data);
			setIsLoaded(true);
		}
	}, [isDataUpdated])

	console.log('render App', articles, isLoaded)
	return (
		<div className="App">
			<header className="App-header">
				<div>
					{error
						? <div>{`Error: ${error.message}`}</div>
						: !isLoaded
							? <div>{'Loading...'}</div>
							: <ArticleList articles={articles} handleUpdateTitle={handleUpdateTitle} handleDeleteArticle={handleDeleteArticle} />
					}
				</div>
			</header>
		</div>
	);
}

export default App;
