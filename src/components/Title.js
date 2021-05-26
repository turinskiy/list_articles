import {useEffect, useState} from 'react';

export const Title = (props) => {
    const {url, title} = props;
    const [titleText, setTitleText] = useState(title);
    const [isEdit, setIsEdit] = useState(false);

    function handleTextInput(value) {
        console.log(value)
        setTitleText(value);//(prev => `${prev}`)
    }

    // useEffect(() => {
    //     function handleTextInput(value) {
    //         console.log(value)
    //         setTitleText(value);//(prev => `${prev}`)
    //     }
    // }, [titleText]);


    return (
        <div className="row article-title grow01">
            <div className="title-text">
                {isEdit 
                    ? <input type='text' value={titleText} onChange={e => handleTextInput(e.target.value)} /> 
                    : <a target="_blank" href={url}>{titleText}</a>
                }
            </div>
            <div className="column">
                <button onClick={() => setIsEdit(!isEdit)}>{'</>'}</button>
            </div>
        </div>
    );
}