import './Button.css';

export function Button(props) {
	const { onArticleDelete } = props;

	return (
		<div className="button-container">
			<button className="button" onClick={onArticleDelete}>{'Delete Article'}</button>
		</div>
	);
}