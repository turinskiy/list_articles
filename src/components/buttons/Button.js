import './Button.css';

export function Button(props) {
	const { titleText, onClickHandler, alignment = 'center', className, isDisabled = false } = props;

	return (
		<div className="button-container" style={{justifyContent: alignment}}>
			<button className={["button", className].join(' ')} onClick={(e) => !isDisabled && onClickHandler(e)} data-is-disabled={isDisabled}>{titleText}</button>
		</div>
	);
}