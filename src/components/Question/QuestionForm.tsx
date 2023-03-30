import {Title} from "../common/Title";
import {Arrow} from "../common/Arrow";
import React, {SyntheticEvent, useState} from "react";

import './QuestionForm.scss';
import '../../styles/form.scss';

import {Button} from "../common/Button";
import {QuestionAnswer} from "./QuestionAnswer";
import {QuestionInterface} from "../../interfaces/question-interface";
import {Answer} from "../../interfaces/answer-interface";

export const QuestionForm = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<QuestionInterface>({
        name: '',
        type: 'open',
        answers: [],
    });
    // const [answersCount, setAnswersCount] = useState<Question[]>([]);

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    }

    const changeQuestionType = (value: string) => {
        updateForm('type', value);
        if (value !== 'open') {
            // setAnswersCount(prev => [...prev, {id: 0, added: true, text: ''}]);
            setForm(form => ({...form, answers: [{id: 0, added: true, text: '', votes: 0,}]}));
        }
    }

    const createOrRemoveInput = (q: Answer | null, prevQ: Answer, update: boolean) => {
        if (q !== null) {
            //remove
            // setAnswersCount(prev => prev.filter((el) => el.id !== q.id));
            setForm(form => ({...form, answers: [...form.answers.filter((el) => el.id !== q.id)]}));
        } else {
            //add previous question and add new empty question
            if (update) {
                // setAnswersCount(prev => [...prev.map((el) => el.id === prevQ.id ? prevQ : el)]);
                setForm(form => ({...form, answers: [...form.answers.map((el) => el.id === prevQ.id ? prevQ : el)]}));
            } else {
                // setAnswersCount(prev => [...prev.map((el) => el.id === prevQ.id ? prevQ : el), {
                //     id: prev[prev.length - 1].id + 1,
                //     added: true,
                //     text: ''
                // }]);
                setForm(form => ({
                    ...form,
                    answers: [...form.answers.map((el) => el.id === prevQ.id ? prevQ : el), {
                        id: form.answers[form.answers.length - 1].id + 1,
                        added: true,
                        text: '',
                        votes: 0,
                    }]
                }));
            }
        }
    };

    const submitForm = (e: SyntheticEvent) => {
        e.preventDefault();
        console.log(form);
        setTimeout(() => {
            setForm({ name: '',
                type: 'open',
                answers: [],})
        }, 2000)

    };

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
                                    form.answers.map((a) => <QuestionAnswer key={a.id} idx={a.id}
                                                                            createOrRemoveInput={createOrRemoveInput}/>)
                                }

                            </ol>
                        </label>
                    </div>
                }
                <Button text="Send &#8594;" type="submit"/>
                <p>{form.type}, {form.name}</p>
            </form>
        }
    </>
}