import './QuestionAnswer.scss';
import React, {useEffect, useState} from "react";
import {NewQuestionEntityInForm} from 'types';
import {ErrorMessage} from "../common/ErrorMessage";

interface Props {
    setForm: any;
    setError: any;
}

interface AnswerEntityInForm {
    id: string;
    text: string;
    added: boolean;
    buttonSign: string;
}

export const QuestionAnswer = ({setForm, setError}: Props) => {
    const [answersCount, setAnswersCount] = useState<AnswerEntityInForm[]>([]);
    const [answersError, setAnswersError] = useState<string>('');

    const onChangeInputValue = (id: string, text: string) => {
        setAnswersCount(prev => (prev.map(a => a.id === id ? {...a, text} : a)));
    }

    const onClickHandler = (id: string, text: string, added: boolean) => {
        if (text.trim().length < 1 || answersError.length > 0) return;
        if (!added) {
            // add
            const idX = String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '');
            setAnswersCount(prev => [...prev.map( a => a.id === id ? {...a, added: true, buttonSign: '-'} : a), {
                id: idX,
                added: false,
                text: '',
                buttonSign: '+'
            }]);
        } else {
            //remove
            setAnswersCount(prev => prev.filter((el) => el.id !== id));
        }
    };

    useEffect(() => {
        const arrToCheck = answersCount.map(function(item){ return item.text });
        const isDuplicate = arrToCheck.some(function(item, idx){
            return arrToCheck.indexOf(item) !== idx
        });

        if (isDuplicate) {
            setAnswersError('You already added this answer.');
        } else {
            setAnswersError('');
        }

        const ans = answersCount.length > 0 ? answersCount.filter(n => (n && n.text.length > 0)).map(a => ({text: a.text})) : null;
        setForm((prev: NewQuestionEntityInForm) => ({...prev, answers: ans}));

    }, [answersCount]);

    useEffect(() => {
        const id = String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '');
        if (answersCount.length === 0) {
            setAnswersCount([{id, added: false, text: '', buttonSign: '+'}]);
        }
    }, []);

    useEffect(() => {
        setError(answersError);
    }, [answersError]);

    return <>
        {
            answersCount.map(a => <li key={a.id}>
                <input type="text" value={a.text} onChange={e => onChangeInputValue(a.id, e.target.value)} />
                <button disabled={a.text.trim().length < 1} type="button"
                        onClick={() => onClickHandler(a.id, a.text, a.added,)}>{a.buttonSign}</button>
            </li>)
        }
    </>
}