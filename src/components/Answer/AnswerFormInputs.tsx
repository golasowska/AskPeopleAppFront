import '../../styles/form.scss';
import React from "react";
import {QuestionInterface} from "../../interfaces/question-interface";

interface Props {
    formData: QuestionInterface;
}

export const AnswerFormInputs = (props : Props) => {

   return <>
        <p className='form__question'>{props.formData.name}</p>
        {
            props.formData.answers.map(a => <label className="label__row" key={a.text}>
                <input name={props.formData.name} type={props.formData.type} value={a.text}/>{a.text}
            </label>)
        }
    </>

}