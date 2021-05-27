import { useState } from 'react';

const errorMessages = {
	minLength: 'The title is to short',
	maxLength: 'The title is to long',
	none: 'none'
};

const MAX_VALUE = 200;
const MIN_VALUE = 2;

export function Title(props) {
	const { url, title } = props;
	const [titleText, setTitleText] = useState(title);
	const [isEdittable, setIsEdit] = useState(false);
	const [isEmpty, setIsEmpty] = useState(false);
	const [isErrorMessage, setIsErrorMessage] = useState(false);
	const [errorMessageKey, setErrorMessageKey] = useState('none');
	const [oldTitle, setOldTitle] = useState('');

	function handleTextInput(value) {
		console.log(value);
		setTitleText(value);

		let isEmpty = value.length === 0;
		let isMinLen = value.length > 0 && value.length <= MIN_VALUE;
		let isMaxLen = value.length >= MAX_VALUE;
		setIsEmpty(isEmpty);
		setErrorMessageKey(isMinLen ? 'minLength' : isMaxLen ? 'maxLength' : 'none');
		setIsErrorMessage(isMinLen || isMaxLen);
	}

	function onEdit(event, isFirstClick, isSaveClicked) {
		isFirstClick && setOldTitle(titleText);
		setIsEdit(isFirstClick);

		// Save an updated value into the Storage
		if(isSaveClicked && titleText !== oldTitle) {
			props.onTitleUpdate(event, titleText);
		}
	}

	function onCancel() {
		// debugger
		setTitleText(oldTitle);
		setIsEdit(false);
		setIsErrorMessage(false)
	}

	return (
		<div className="row article-title grow01 align-baselign">
			{isEdittable
				// title as an input
				? <div className="row align-baselign">
					<div className="column" data-is-visible={isEmpty}>
						<span className="required-field">*</span>
					</div>
					<div className="column">
						<div className="cell">
							<input className="input" type='text' value={titleText} onChange={e => handleTextInput(e.target.value)} />
						</div>
						<div className="cell error-message" data-is-visible={isErrorMessage}>
							<span>{errorMessages[errorMessageKey]}</span>
						</div>
					</div>
				</div>
				// title as a link
				: <div className="cell padding-horisontal-small"><a href={url} target="_blank" rel="noreferrer">{titleText}</a></div>
			}
			{/* Buttons */}
			<div className="cell">
				<div className="row align-baselign">
					<div className="cell padding-horisontal-small">
						<button className="button" disabled={isEmpty} onClick={(e) => onEdit(e, !isEdittable, isEdittable)}>{isEdittable ? 'Save' : 'Edit'}</button>
					</div>
					<div className="cell padding-horisontal-small">
						<button className="button" data-is-visible={isEdittable} onClick={onCancel}>{'Cancel'}</button>
					</div>
				</div>
			</div>
		</div>
	);
}