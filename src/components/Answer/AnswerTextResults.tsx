import {QuestionInterface} from "../../interfaces/question-interface";

import './AnswerTextResults.scss';

interface Props {
    formData: QuestionInterface;
}

export const AnswerTextResults = (props: Props) => {

    const {name, answers} = props.formData;

    return <div className="results__container">
        <h2>{name}</h2>
        <ul>
        {
            answers.map(a => <li key={a.id}>{a.text}</li>)
        }
        </ul>
    </div>
}