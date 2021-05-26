import {Title} from './Title';

export const Article = (props) => {
  const { content } = props;
  let width = Math.floor(content.width * 100 / 12);

  // function onEditClick()

  return (
    <div className="article-block" style={{ width: `${width}vw` }}>
      <div className="column article">
        {/* Image */}
        <div className="column grow1">
          <div className="cell-image">
            <img src={content.imageUrl} alt={content.title} />
          </div>
        </div>

        {/* <div className="row grow1"> */}
          <div className="column grow0">
            {/* Title */}
            <Title url={content.url} title={content.title} />

            {/* Buttons */}
            <div className="button-block grow0">
              <button className="button">{'Del'}</button>
            </div>
          </div>
        {/* </div> */}
      </div>
    </div>
  );
}
