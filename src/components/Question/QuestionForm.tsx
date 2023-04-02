import {Title} from "../common/Title";
import {Arrow} from "../common/Arrow";
import React, {SyntheticEvent, useState} from "react";

import './QuestionForm.scss';
import '../../styles/form.scss';

import {Button} from "../common/Button";
import {QuestionAnswer} from "./QuestionAnswer";
import {AnswerEntityInForm, NewQuestionEntity, AnswerEntity } from "types";
import {apiUrl} from "../../config/api";

export const QuestionForm = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [answersCount, setAnswersCount] = useState<AnswerEntityInForm[]>([]);
    const [form, setForm] = useState<NewQuestionEntity>({
        name: '',
        type: 'open',
        answers: null,
    });

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    }

    const changeQuestionType = (value: string) => {
        updateForm('type', value);
        if (value !== 'open') {
            setAnswersCount(prev => [{id: 0, added: true, text: ''}]);
        }
    }

    const createOrRemoveInput = (q: AnswerEntityInForm | null, prevQ: AnswerEntityInForm, update: boolean) => {
        if (q !== null) {
            //remove
            setAnswersCount(prev => prev.filter((el) => el.id !== q.id));
        } else {
            //add previous question and add new empty question
            if (update) {
                setAnswersCount(prev => [...prev.map((el) => el.id === prevQ.id ? prevQ : el)]);
            } else {
                setAnswersCount(prev => [...prev.map((el) => el.id === prevQ.id ? prevQ : el), {
                    id: prev[prev.length - 1].id + 1,
                    added: true,
                    text: ''
                }]);
            }
        }
    };

    const submitForm = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        // @TODO validation!
        const ans = answersCount.length > 0 ? answersCount.map(a => ({text: a.text, id: '', votes: 0})) : null;
        setForm(form => ({...form, answers: ans}));
        // console.log(form);
        try {
            const res = await fetch(`${apiUrl}/questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form, answers: ans
                }),
            });
            const data = await res.json();
            setId(data.id);
        } finally {
            setLoading(false);
            // setForm(prev => ({...prev, name: '', type: 'open', answers: null}));
            setAnswersCount([]);
        }
    };

    if(loading) {
        return <h2>Your question is being submitted...</h2>
    }

    if(id) {
        const text = `Your question "${form.name}" has been submitted`
        return <div className='title__wrapper'>
            <Title>{text}</Title>
            <Arrow/>
        </div>
    }

    return <>
        <div className='title__wrapper'>
            <Title>Ask a question</Title>
            <Arrow/>
        </div>
        {loading && <h2>Loading data to server...</h2>}
        {!loading &&
            <form onSubmit={submitForm}>
                <div className="form__control">
                    <label>
                        Your question: <br/>
                        <input
                            type="text"
                            name="name"
                            required
                            maxLength={99}
                            value={form.name}
                            onChange={e => updateForm('name', e.target.value)}
                        />
                    </label>
                </div>
                <div className="form__control">
                    <label>
                        Type of question: <br/>
                        <span className="arrow__select"></span>
                        <select onChange={e => changeQuestionType(e.target.value)} disabled={form.name.trim().length < 1}>
                            <option value="open">Open question</option>
                            <option value="radio">Only one answer</option>
                            <option value="checkbox">Multiple choice</option>
                        </select>
                    </label>
                </div>
                {
                    form.type !== 'open' &&
                    <div className="form__control">
                        <label>
                            Add possible answer: <br/>
                            <ol>
                                {
                                    answersCount.map((a) => <QuestionAnswer key={a.id} idx={a.id}
                                                                            createOrRemoveInput={createOrRemoveInput}/>)
                                }

                            </ol>
                        </label>
                    </div>
                }
                <Button text="Send &#8594;" type="submit"/>
            </form>
        }
    </>
}