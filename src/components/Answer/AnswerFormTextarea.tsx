import '../../styles/form.scss';
import React from "react";

interface Props {
    name: string;
}

export const AnswerFormTextarea = (props: Props) => {

    return <>
        <p className='form__question'>{props.name}</p>
        <textarea name="name" cols={30} rows={10}></textarea>
    </>

}