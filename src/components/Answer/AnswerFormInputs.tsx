import '../../styles/form.scss';
import React, {ChangeEvent, useEffect, useState} from "react";
import { QuestionEntity } from 'types';

interface Props {
    formData: QuestionEntity;
    setVote: any;
}

export const AnswerFormInputs = (props : Props) => {

    const [answerId, setAnswerId] = useState<string[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(props.formData.type === "radio") {
            setAnswerId([e.target.value])
        } else {
            setAnswerId(prev => ( (prev.indexOf(e.target.value) < 0) ? [...prev, e.target.value] : prev.filter(a => a !== e.target.value)));
        }
    }

    useEffect(() => {
        props.setVote(answerId);
    }, [answerId]);

   return <>
        <p className='form__question'>{props.formData.name}</p>
        {
            props.formData.answers && props.formData.answers.map(a => <label className="label__row" key={a.id}>
                <input checked={answerId.indexOf(a.id) !== -1}
                       name={props.formData.name}
                       type={props.formData.type}
                       value={a.id}
                       onChange={handleChange}
                />{a.text}
            </label>)
        }
    </>

}