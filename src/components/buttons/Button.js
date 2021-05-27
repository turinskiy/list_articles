import './Button.css';

export function Button(props) {
	const { titleText, onClickHandler, className, isDisabled = false } = props;

	return (
		<div className="button-container">
			<button className={["button", className].join(' ')} onClick={(e) => !isDisabled && onClickHandler(e)} data-is-disabled={isDisabled}>{titleText}</button>
		</div>
	);
}