import './AnswerView.scss';
import {Title} from "../common/Title";
import {Arrow} from "../common/Arrow";
import React, {useEffect, useState} from "react";
import {AnswerForm} from "./AnswerForm";
import {AnswerGraphPie} from "./AnswerGraphPie";
import {AnswerTextResults} from "./AnswerTextResults";
import {AnswerGraph} from "./AnswerGraph";
import {QuestionEntity} from 'types';
import {useParams} from "react-router-dom";
import {apiUrl} from "../../config/api";
import {InfoMessage} from "../common/InfoMessage";
import {NotFoundView} from "../layout/NotFoundView";
import {Switch} from "../common/Switch";

export const AnswerView = () => {
    const [question, setQuestion] = useState<QuestionEntity | null>(null);
    const [isLoading, setIsoLoading] = useState<boolean>(true);
    const [info, setInfo] = useState('Thanks for your answer :)');
    const [showPie, setShowPie] = useState<boolean>(false);
    const {id} = useParams();

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${apiUrl}/questions/${id}`);
                const data = await res.json();
                // console.log(data);
                setQuestion(data);
            } finally {
                setIsoLoading(false);
            }

        })();
    }, []);

    const submitForm = async (vote: string[]) => {
        const res = await fetch(`${apiUrl}/questions/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                answerBody: vote
            }),
        });
        const data = await res.json();
        if (data.message) {
            setInfo(data.message);
            return;
        }
        setQuestion(data);
    };

    const switchGraph = () => {
        setShowPie(prev => !prev);
    };

    if (!question && isLoading) {
        return <InfoMessage to={false}><span>Loading...</span></InfoMessage>;
    }

    if (!question) {
        return <NotFoundView/>;
    }

    return <>
        <div className='title__wrapper'>
            <Title>What people said</Title>
            <Arrow/>
        </div>
        <div className="wrapper">
            <div className="container">
                <h2 className="answer__title">{question.name}</h2>
                { question.type !== 'open' && <Switch switchState={switchGraph} /> }
            </div>
            {
                question.answers === null &&
                <InfoMessage to={false}><span>Be the first person to answer this question :)</span></InfoMessage>
            }
            {(question.answers !== null && question.type === 'open') && <AnswerTextResults formData={question}/>}
            {((question.answers !== null && question.type !== 'open') && showPie) &&
                <AnswerGraphPie formData={question}/>}
            {((question.answers !== null && question.type !== 'open') && !showPie) &&
                <AnswerGraph formData={question}/>}
            <div className='title__wrapper border--top'>
                <Title>Answer a question</Title>
                <Arrow/>
            </div>
            <AnswerForm submitForm={submitForm} formData={question} info={info}/>
        </div>
    </>
}