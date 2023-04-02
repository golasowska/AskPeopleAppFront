import './AnswerView.scss';
import {Title} from "../common/Title";
import {Arrow} from "../common/Arrow";
import React, {useEffect, useState} from "react";
import {AnswerForm} from "./AnswerForm";
import {AnswerGraphPie} from "./AnswerGraphPie";
import {AnswerTextResults} from "./AnswerTextResults";
import {AnswerGraph} from "./AnswerGraph";
import {QuestionEntity } from 'types';
import {useParams} from "react-router-dom";

export const AnswerView = () => {
    const [question, setQuestion] = useState<QuestionEntity | null>(null);
    const [showPie, setShowPie] = useState<boolean>(false);
    const {id} = useParams();

    useEffect(() => {
        ( async() => {
            const res = await fetch(`http://localhost:3001/questions/${id}`);
            const data = await res.json();
            // console.log(data);
            setQuestion(data);
        })();
    }, []);

    if(!question) {
        return <h2>Question with ID {id} doesn't exists :( </h2>
    }

    return <>
        {/*@TODO check if all data is available*/}
        <div className='title__wrapper'>
            <Title>What people said</Title>
            <Arrow/>
        </div>
        <div className="wrapper">
            <div className="container">
                <h2 className="answer__title">{question.name}</h2>
                {question.type !== 'open' &&
                    <label className="switch">
                        <input type="checkbox" onChange={() => setShowPie(prev => !prev)}/>
                        <span></span>
                    </label>
                }
            </div>
            {(question.answers && question.type === 'open') && <AnswerTextResults formData={question}/>}
            {((question.answers && question.type !== 'open') && showPie) && <AnswerGraphPie formData={question}/>}
            {((question.answers && question.type !== 'open') && !showPie) && <AnswerGraph formData={question}/>}
            <div className='title__wrapper border--top'>
                <Title>Answer a question</Title>
                <Arrow/>
            </div>
            <AnswerForm formData={question}/>
        </div>
    </>
}