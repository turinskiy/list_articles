import { ArticleCell } from './ArticleCell'

export function ArticleRow(props) {
	const { data, row } = props;

	return <div className="row min-height">
		{data.columns.map((item, index) => {
			return <ArticleCell content={item} key={index} row={row} cell={index} />
		})}
	</div>;
}