import '../../styles/form.scss';
import React, {SyntheticEvent, useEffect, useState} from "react";
import {Button} from "../common/Button";
import {AnswerFormTextarea} from "./AnswerFormTextarea";
import {AnswerFormInputs} from "./AnswerFormInputs";
import { QuestionEntity } from 'types';
import {InfoMessage} from "../common/InfoMessage";


interface Props {
    formData: QuestionEntity;
    submitForm: any;
    info: string;
}

export const AnswerForm = (props : Props) => {

    const [vote, setVote] = useState<string[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { formData, submitForm } = props;

    const handleSubmitForm = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (vote.length < 1 || ( formData.type === "open" && vote[0].length < 1)) {
            setError(true);
            return;
        }
        submitForm(vote);
        setFormSubmitted(true);
        // console.log('vote', vote);
    };

    useEffect(() => {
        console.log(vote);
        if (vote.length > 0) {
            setError(false);
        }
    }, [vote]);

    if (formSubmitted) {
        return <InfoMessage to={true}>{props.info}</InfoMessage>;
    }

    return <form onSubmit={handleSubmitForm}>
                <div className="form__control">
                    {props.formData.type === 'open' ?
                        <AnswerFormTextarea error={error} setVote={setVote} name={formData.name} /> :
                        <AnswerFormInputs error={error} setVote={setVote} formData={formData} />
                    }
                </div>
                <Button text="Send &#8594;" type="submit"/>
            </form>
}