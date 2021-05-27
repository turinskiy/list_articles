import { useState } from 'react';
import { errorMessages } from '../constants/articles';
import { Button } from './buttons/Button';


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
		let isMinLen = value.length > 0 && value.length <= errorMessages.MIN_VALUE;
		let isMaxLen = value.length >= errorMessages.MAX_VALUE;
		setIsEmpty(isEmpty);
		setErrorMessageKey(isMinLen ? 'minLength' : isMaxLen ? 'maxLength' : 'none');
		setIsErrorMessage(isMinLen || isMaxLen);
	}

	function onEdit(event, isFirstClick, isSaveClicked) {
		isFirstClick && setOldTitle(titleText);
		setIsEdit(isFirstClick);

		// Save an updated value into the Storage
		if (isSaveClicked && titleText !== oldTitle) {
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
						<div className="cell padding-horisontal-small">
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
					<div className="cell"/* padding-horisontal-small"*/>
						<Button titleText={isEdittable ? 'Save' : 'Edit'} onClickHandler={(e) => onEdit(e, !isEdittable, isEdittable)} isDisabled={isEmpty || isErrorMessage} />
					</div>
					<div className="cell"/* padding-horisontal-small"*/ data-is-visible={isEdittable}>
						<Button titleText="Cancel" onClickHandler={onCancel} className="button-cancel" />
					</div>
				</div>
			</div>
		</div>
	);
}