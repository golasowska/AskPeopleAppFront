import {Title} from "../common/Title";
import {Arrow} from "../common/Arrow";
import React, {SyntheticEvent, useEffect, useState} from "react";

import './QuestionForm.scss';
import '../../styles/form.scss';

import {Button} from "../common/Button";
import {QuestionAnswer} from "./QuestionAnswer";
import {NewQuestionEntityInForm } from "types";
import {apiUrl} from "../../config/api";
import {InfoMessage} from "../common/InfoMessage";
import {ErrorMessage} from "../common/ErrorMessage";
import {Link} from "react-router-dom";

export const QuestionForm = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [error, setError] = useState<string>('');
    const [form, setForm] = useState<NewQuestionEntityInForm>({
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

    const submitForm = async (e: SyntheticEvent) => {
        // @TODO add error messages for name and type!
        e.preventDefault();
        if (form.name.length < 1 || form.type.length < 1) {
            return;
        }
        if (form.type !== "open" && form.answers === null) {
            return;
        }
        if (form.type !== "open" && form.answers !== null && form.answers.length < 2) {
            return;
        }
        if (error.length > 0) {
            return;
        }
        setLoading(true);

        try {
            // console.log(form);
            const res = await fetch(`${apiUrl}/questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            setId(data.id);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (form.name.length < 1) {
            setForm(form => ({
                ...form,
                answers: null,
            }));
        }
    }, [form.name]);

    useEffect(() => {
        if (form.type === "open") {
            setForm(form => ({
                ...form,
                answers: null,
            }));
        }
    }, [form.type]);

    if(loading) {
        return <InfoMessage to={true}>Your question is being submitted...</InfoMessage>;
    }

    if(id) {
        return <InfoMessage to={true}>
            Your question<span> " <Link to={`/questions/${id}`} >{form.name}</Link> " </span> has been submitted
        </InfoMessage>;
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
                            maxLength={99}
                            value={form.name}
                            onChange={e => updateForm('name', e.target.value)}
                        />
                    </label>
                </div>
                {
                    form.name.length > 0 && <div className="form__control">
                        <label>
                            Type of question: <br/>
                            <span className="arrow__select"></span>
                            <select onChange={e => updateForm('type', e.target.value)}
                                    disabled={form.name.trim().length < 1}>
                                <option value="open">Open question</option>
                                <option value="radio">Only one answer</option>
                                <option value="checkbox">Multiple choice</option>
                            </select>
                            </label>
                    </div>
                }
                {
                    form.type !== 'open' && form.name.length > 0 &&
                    <div className="form__control">
                        <label>
                            Add possible answers ( at least 2 ): <br/>
                            <ol>
                                <QuestionAnswer setForm={setForm} setError={setError} />
                            </ol>
                        </label>
                    </div>
                }
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button text="Send &#8594;" type="submit"/>
            </form>
        }
    </>
}