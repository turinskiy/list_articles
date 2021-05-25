
export const Article = (props) => {
  const { content } = props;
  let width = Math.floor(content.width * 100 / 12);

  // imageUrl: "https://dbstatic.no/?imageId=72003501&panow=0&panoh=0&panoy=0&panox=0&heighty=0&heightx=0&heightw=0&heighth=0"
  // title: "Stakkars mann!"
  // type: "Article"
  // url: "https://www.dagbladet.no/sport/det-han-ser-er-det-han-har/72005062"
  // width: 4

  // console.log('width', width)
  return (
    <div className="article-block" style={{ width: `${width}vw` }}>
      <div className="row article">
        {/* Image */}
        <div className="cell-image">
          <img src={content.imageUrl} alt={content.title} />
        </div>

        <div className="row grow1">
          <div className="column grow1">
            {/* Title */}
            <div className="article-title grow1">
              <div>
                <a target="_blank" href={content.url}>{content.title}</a>
              </div>
            </div>
            {/* Buttons */}
            <div className="grow0">
              <button>{'Edit'}</button>
              <button>{'Del'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
