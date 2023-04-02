import './QuestionAnswer.scss';
import React, {useState} from "react";

interface Props {
    idx: number;
    createOrRemoveInput: any;
}

export const QuestionAnswer = ({createOrRemoveInput, idx}: Props) => {
    const [added, setAdded] = useState(false);
    const [text, setText] = useState('+');
    const [value, setValue] = useState('');

    const onChangeInputValue = ( text: string ) => {
        setValue(text);
        createOrRemoveInput(null, {id: idx, added, text: value,}, true);
    }

    const onClickHandler = () => {
        if (value.trim().length < 1) return;
        if(!added) {
            setAdded(true);
            setText('-');
            createOrRemoveInput(null, {id: idx, added, text: value,}, false);
        } else {
            createOrRemoveInput({id: idx, added, text: value}, {id: idx, added, text: value}, false);
        }
    };

    return <li>
        <input type="text" onChange={e => onChangeInputValue(e.target.value)} />
        <button disabled={value.trim().length < 1} type="button" onClick={onClickHandler}>{text}</button>
    </li>
}