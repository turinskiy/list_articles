import React from "react";

const getAllArticles = async () => {
    let json = '';
    let url = 'https://storage.googleapis.com/aller-structure-task/test_data.json';
    // let response = await fetch(url);

    // if (response.ok) { // если HTTP-статус в диапазоне 200-299
    //     // получаем тело ответа (см. про этот метод ниже)
    //     json = await response.json();
    // } else {
    //     alert("Ошибка HTTP: " + response.status);
    // }

    fetch(url)
        .then(response => response.json())
        .then(result => json = result);

    return json;
}

class Article extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            articles: []
        };
    }

    componentDidMount() {
        fetch('https://storage.googleapis.com/aller-structure-task/test_data.json')
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        isLoaded: true,
                        articles: result
                    })
                },
                error => {
                    console.log('get into error block')
                    this.setState({
                        isLoaded: false,
                        error
                    })
                }
                );
    }

    render() {
        const { error, isLoaded, articles} = this.state;
        console.log('articles', articles[0])
        
        if(error) {
            return <div>{error}</div>
        } else if(!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (<ul>
                {articles[0].map((article, id) => (<li key={id}>{`${id}) ${article.columns[0].title}`}</li>))}
            </ul>);
        }
    }
}

export default Article;