import '../../styles/form.scss';
import React, {SyntheticEvent, useEffect, useState} from "react";
import {QuestionInterface} from "../../interfaces/question-interface";
import {Button} from "../common/Button";
import {AnswerFormTextarea} from "./AnswerFormTextarea";
import {AnswerFormInputs} from "./AnswerFormInputs";


interface Props {
    formData: QuestionInterface;
}

export const AnswerForm = (props : Props) => {

    const submitForm = (e: SyntheticEvent) => {
        e.preventDefault();
        console.log(e);
    };

    return <form onSubmit={submitForm}>
                <div className="form__control">
                    {props.formData.type === 'open' ? <AnswerFormTextarea name={props.formData.name} /> :
                        <AnswerFormInputs formData={props.formData} /> }
                </div>
                <Button text="Send &#8594;" type="submit"/>
            </form>
}