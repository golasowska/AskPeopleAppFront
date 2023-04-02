import '../../styles/form.scss';
import React, {SyntheticEvent} from "react";
import {Button} from "../common/Button";
import {AnswerFormTextarea} from "./AnswerFormTextarea";
import {AnswerFormInputs} from "./AnswerFormInputs";
import { QuestionEntity } from 'types';


interface Props {
    formData: QuestionEntity;
}

export const AnswerForm = (props : Props) => {

    const submitForm = (e: SyntheticEvent) => {
        e.preventDefault();
        console.log(e);
    };

    return <form onSubmit={submitForm}>
                <div className="form__control">
                    {props.formData.type === 'open' ?
                        <AnswerFormTextarea name={props.formData.name} /> :
                        <AnswerFormInputs formData={props.formData} />
                    }
                </div>
                <Button text="Send &#8594;" type="submit"/>
            </form>
}