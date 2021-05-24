import { useEffect, useState } from "react";

export const Articles = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setIsLoaded(false);

    fetch('https://storage.googleapis.com/aller-structure-task/test_data.json')
      .then(res => res.json())
      .then(
        (result) => {
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

  return !articles || articles.length === 0 ? null : (
    <ul>
      {articles.map((item, id) => (
        <li key={id}>
          {item.columns[0].title}
        </li>
      ))}
    </ul>
  )
}