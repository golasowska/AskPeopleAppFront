import '../../styles/form.scss';
import React, {SyntheticEvent, useState} from "react";
import {Button} from "../common/Button";
import {AnswerFormTextarea} from "./AnswerFormTextarea";
import {AnswerFormInputs} from "./AnswerFormInputs";
import { QuestionEntity } from 'types';


interface Props {
    formData: QuestionEntity;
    submitForm: any;
}

export const AnswerForm = (props : Props) => {

    const [vote, setVote] = useState<string[]>([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { formData, submitForm } = props;

    const handleSubmitForm = async (e: SyntheticEvent) => {
        e.preventDefault();
        submitForm(vote);
        setFormSubmitted(true);
        // console.log('vote', vote);
    };

    if (formSubmitted) {
        return <h2>Thanks for yout vote :) </h2>
    }

    return <form onSubmit={handleSubmitForm}>
                <div className="form__control">
                    {props.formData.type === 'open' ?
                        <AnswerFormTextarea setVote={setVote} name={formData.name} /> :
                        <AnswerFormInputs setVote={setVote} formData={formData} />
                    }
                </div>
                <Button text="Send &#8594;" type="submit"/>
            </form>
}