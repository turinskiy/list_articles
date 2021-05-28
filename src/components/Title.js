import { useState } from 'react';
import { errorMessages } from '../constants/articles';
import { IconButton } from './icons/IconButton';


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

	function onEditClcik() {
		setOldTitle(titleText);
		setIsEdit(true);
	}

	function onSave(event) {
		// Save an updated value into the Storage
		setIsEdit(false);
		props.onTitleUpdate(event, titleText);
	}

	function onCancel() {
		setTitleText(oldTitle);
		setIsEdit(false);
		setIsEmpty(false);
		setIsErrorMessage(false)
	}

	return (
		<div className="row article-title grow01 align-baselign" style={{padding: '1rem 0.25rem 0.25rem'}}>
			<div className="row">

				<div className="column grow1">
					<div className="cell" style={{padding: isEdittable ? '0 .25rem' : '0.25rem 0'}}>
						{isEdittable 
							? <input className="input" type='text' value={titleText} onChange={e => handleTextInput(e.target.value)} data-is-empty={isEmpty} />
							: <a href={url} target="_blank" rel="noreferrer">{titleText}</a>
						}
					</div>
				
					{/* Error message | Save | Cancel */}
					<div className="row grow1" data-is-visible={isEdittable}>
						<div className="cell grow1" style={{alignItems: 'flex-start', padding: '0 .25rem'}} data-is-visible={isErrorMessage}>
							<span className="error-message">{errorMessages[errorMessageKey]}</span>
						</div>
						<div className="row" style={{justifyContent: 'flex-end'}}>
							<div style={{padding: '.25rem'}} className="cell">
								<IconButton type="check"  onClickHandler={(e) => onSave(e)} isDisabled={isEmpty || isErrorMessage} height="1.5rem" />
							</div>
							<div style={{padding: '.25rem'}} className="cell">
								<IconButton type="esc" onClickHandler={onCancel}  height="1.5rem" />
							</div>
						</div>
					</div>
				
				</div>

				{/* Edit Button */}
				<div className="cell" style={{flexGrow: '0', padding: '0 0.25rem'}}>
					<IconButton type="edit" onClickHandler={onEditClcik} isDisabled={isEdittable} height="2rem" />
				</div>
			</div>
		</div>
	);
}