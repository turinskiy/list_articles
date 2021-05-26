import {useEffect, useState} from 'react';
import { checkStorageAvailability, loadAllArticles, saveAllArticles } from './services/storages';
import { loadArticlesByUrl } from './services/articles';
import { ArticleList } from './components/ArticleList';

import './App.css';

function App() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		checkStorageAvailability();
		// Check if data exists in the storage
		let data = loadAllArticles();
		
		if(data) {
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
	}, [])

	// console.log('render App', articles, isLoaded)
	return (
		<div className="App">
			<header className="App-header">
				<div>
					{error 
						? <div>{`Error: ${error.message}`}</div>
						: !isLoaded 
							? <div>{'Loading...'}</div>
							: <ArticleList articles={articles}/>
					}
				</div>
			</header>
		</div>
	);
}

export default App;
