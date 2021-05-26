import {Article} from './Article'

export const ArticleRow = (props) => {
    const { data } = props;
  
    // console.log('data', data)
    return <div className="row min-height">
      {data.columns.map((item, index) => {
        return <Article content={item} key={index} />
      })}
    </div>;
  }  