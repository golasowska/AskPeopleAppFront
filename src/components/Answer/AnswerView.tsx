import './AnswerView.scss';
import {Title} from "../common/Title";
import {Arrow} from "../common/Arrow";
import React, {useEffect, useState} from "react";
import {AnswerForm} from "./AnswerForm";
import {AnswerGraphPie} from "./AnswerGraphPie";
import {QuestionInterface} from "../../interfaces/question-interface";
import {AnswerTextResults} from "./AnswerTextResults";
import {AnswerGraph} from "./AnswerGraph";

export const AnswerView = () => {

    const [showPie, setShowPie] = useState<boolean>(true);

    const [formData, setFormData] = useState<QuestionInterface>({
        name: '',
        type: 'open',
        answers: [],
    });

    useEffect(() => {
        setFormData({
            name: 'Jaki owoc jest najsmaczniejszy ?',
            type: 'checkbox',
            answers: [
                {id: 1231123123, added: true, text: 'Jabłko', votes: 75},
                {id: 12314234234, added: true, text: 'Gruszka', votes: 53},
                {id: 75675675, added: true, text: 'Ananas', votes: 15},
                {id: 67845345, added: true, text: 'Mango', votes: 100},
            ],
        });
    }, []);

    return <>
        <div className='title__wrapper'>
            <Title>What people said</Title>
            <Arrow/>
        </div>
        <div className="wrapper">
            <div className="container">
                <h2 className="answer__title">{formData.name}</h2>
                {formData.type !== 'open' &&
                    <label className="switch">
                        <input type="checkbox" onChange={() => setShowPie(prev => !prev)}/>
                        <span></span>
                    </label>
                }
            </div>
            {formData.type === 'open' && <AnswerTextResults formData={formData}/>}
            {(formData.type !== 'open' && showPie) && <AnswerGraphPie formData={formData}/>}
            {(formData.type !== 'open' && !showPie) && <AnswerGraph formData={formData}/>}
            <div className='title__wrapper border--top'>
                <Title>Answer a question</Title>
                <Arrow/>
            </div>
            <AnswerForm formData={formData}/>
        </div>
    </>
}