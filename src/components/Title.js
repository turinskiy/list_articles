import { useEffect, useState } from 'react';
import { errorMessages } from '../constants/articles';
import { Button } from './buttons/Button';
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

	function onEditClcik(event, isFirstClick, isSaveClicked) {
		isFirstClick && setOldTitle(titleText);
		setIsEdit(isFirstClick);

		// // Save an updated value into the Storage
		// if (isSaveClicked && titleText !== oldTitle) {
		// 	props.onTitleUpdate(event, titleText);
		// }
	}

	function onSave(event) {
		// Save an updated value into the Storage
		setIsEdit(false);
		props.onTitleUpdate(event, titleText);
	}

	function onCancel() {
		// debugger
		setTitleText(oldTitle);
		setIsEdit(false);
		setIsErrorMessage(false)
	}

	return (
		<div className="row article-title grow01 align-baselign" style={{padding: '1rem 0.25rem 0'}}>
			<div className="row">
				{/* Inline Edit field */}
				{/* <div className="cell grow1 justify-center" style={{border: '1px solid lime', position: 'relative'}}>
					<input className="input" type='text' value={titleText} onChange={e => handleTextInput(e.target.value)} data-is-empty={isEmpty} />
					{/* <a className="inpu" href={url} target="_blank" rel="noreferrer">{titleText}</a> /}
					<span className="error-message">{errorMessages[errorMessageKey]}</span>
				</div> */}

				<div className="column grow1" style={{border: '0px solid lime', position: 'relative'}}>
					<div className="cell" style={{padding: isEdittable ? '0 .25rem' : '0.25rem 0'}}>
						{isEdittable 
							? <input className="input" type='text' value={titleText} onChange={e => handleTextInput(e.target.value)} data-is-empty={isEmpty} />
							: <a className="inpu" href={url} target="_blank" rel="noreferrer">{titleText}</a>
						}
					</div>
				
					{/* Error message | Save | Cancel */}
					<div className="row grow1" data-is-visible={isEdittable}>
						<div className="cell grow1" style={{alignItems: 'flex-start', padding: '0 .25rem'}} data-is-visible={isErrorMessage}>
							<span className="error-message">{errorMessages[errorMessageKey]}</span>
						</div>
						<div className="row" style={{justifyContent: 'flex-end'}}>
							<div style={{border: '0px solid black', padding: '.25rem .25rem 0'}} className="cell">
								<IconButton type="check"  onClickHandler={(e) => onSave(e)} />
							</div>
							<div style={{border: '0px solid black', padding: '.25rem .25rem 0'}} className="cell">
								<IconButton type="esc" onClickHandler={onCancel} />
							</div>
						</div>
					</div>
				
				</div>




				{/* Buttons */}
				<div className="cell" style={{flexGrow: '0', border: '0px solid red'}}>
					<div className="row align-baselign">
						<div className="cell" style={{border: '0px solid black', padding: '0 0.25rem'}}>
							{/* <Button titleText={isEdittable ? 'Save' : 'Edit'} onClickHandler={(e) => onEditClcik(e, !isEdittable, isEdittable)} isDisabled={isEmpty || isErrorMessage} /> */}
							<IconButton type="edit" onClickHandler={(e) => onEditClcik(e, !isEdittable, isEdittable)} isDisabled={isEdittable} />
						</div>
						{/* <div className="cell" data-is-visible={isEdittable}>
							<Button titleText="Cancel" onClickHandler={onCancel} className="button-cancel" />
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
}