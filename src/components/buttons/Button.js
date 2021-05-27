import './Button.css';

export function Button(props) {
	const { titleText, onClickHandler, className } = props;

	return (
		<div className="button-container">
			<button className={["button", className].join(' ')} onClick={onClickHandler}>{titleText}</button>
		</div>
	);
}