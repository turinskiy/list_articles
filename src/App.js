import { ArticleList } from './components/ArticleList';

import './App.css';

function App() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		setIsLoaded(false);

		fetch('https://storage.googleapis.com/aller-structure-task/test_data.json')
			.then(res => res.json())
			.then(
				(result) => {
					// console.log(result[0])
					setIsLoaded(true);
					setArticles(result[0]);
				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			)
	}, [])

	if (error) {
		return <div>{`Error: ${error.message}`}</div>
	}
	else if (!isLoaded) {
		return <div>{'Loading...'}</div>
	}

	return (
		<div className="App">
			<header className="App-header">
				<div>
					<ArticleList articles={articles}/>
				</div>
			</header>
		</div>
	);
}

export default App;
