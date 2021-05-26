import {useEffect, useState} from 'react';
import { ArticleList } from './components/ArticleList';

import './App.css';
import { loadAllArticles, saveAllArticles } from './services/storages';

function App() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		// Check if data exists in the storage
		let data = loadAllArticles();
		
		if(data) {
			setArticles(data);
			setIsLoaded(true);
		} else {
			fetch('https://storage.googleapis.com/aller-structure-task/test_data.json')
			.then(res => res.json())
			.then(
				(result) => {
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
