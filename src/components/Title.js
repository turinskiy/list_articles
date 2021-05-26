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
	const [isEdit, setIsEdit] = useState(false);
	const [isEmpty, setIsEmpty] = useState(false);
	const [isErrorMessage, setIsErrorMessage] = useState(false);
	const [errorMessageKey, setErrorMessageKey] = useState('');
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

	function onEdit(flag) {
		// debugger
		setOldTitle(titleText);
		console.log('flag', flag);
		setIsEdit(flag);
	}

	function onCancel() {
		// debugger
		setTitleText(oldTitle);
		setIsEdit(false);
	}

	// useEffect(() => {
	//     function handleTextInput(value) {
	//         console.log(value)
	//         setTitleText(value);//(prev => `${prev}`)
	//     }
	// }, [titleText]);


	return (
		<div className="row article-title grow01 align-baselign">
			{isEdit
				// title as an input
				? <div className="row align-baselign">
					<div className="column" data-is-visible={isEmpty}>
						<span className="required-field">*</span>
					</div>
					<div className="column">
						<div className="cell">
							<input type='text' value={titleText} onChange={e => handleTextInput(e.target.value)} />
						</div>
						<div className="cell" data-is-visible={isErrorMessage}>
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
						<button disabled={isEmpty} onClick={() => onEdit(!isEdit)}>{isEdit ? 'Save' : 'Edit'}</button>
					</div>
					<div className="cell padding-horisontal-small">
						<button disabled={!isEdit} onClick={onCancel}>{'X'}</button>
					</div>
				</div>
			</div>
		</div>
	);
}