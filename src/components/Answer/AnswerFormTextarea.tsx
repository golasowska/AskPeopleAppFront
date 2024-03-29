import '../../styles/form.scss';
import React, {ChangeEvent, useEffect, useState} from "react";
import {ErrorMessage} from "../common/ErrorMessage";

interface Props {
    name: string;
    setVote: (vote: string[]) => void;
    error: boolean;
}

export const AnswerFormTextarea = (props: Props) => {

    const [answerText, setAnswerText] = useState<string[]>([]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length < 1) {
            setAnswerText([]);
        } else {
            setAnswerText([e.target.value]);
        }

    }

    useEffect(() => {
        props.setVote(answerText);
    }, [answerText]);

    return <>
        <p className='form__question'>{props.name}</p>
        <textarea name="name" cols={30} rows={10} onChange={handleChange}></textarea>
        {
            props.error && <ErrorMessage>Please write an answer before sending form :) </ErrorMessage>
        }
    </>

}