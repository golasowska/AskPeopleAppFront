import {useEffect, useState} from "react";
import './Grid.scss';
import {SimpleQuestionEntity} from 'types';

import {GridItem} from "./GridItem";
import {Link} from "react-router-dom";
import {apiUrl} from "../../config/api";

export const Grid = () => {
    const [questions, setQuestions] = useState<SimpleQuestionEntity[]>([]);

    useEffect(() => {
        ( async() => {
            const res = await fetch(`${apiUrl}/questions`);
            const data = await res.json();
            setQuestions(data);
        })();
    }, []);

    return <div className="grid">
        <GridItem classProp="new">
            <Link to='/questions/add'>+</Link>
        </GridItem>
        {
            questions.map(({id, name, type}, idx) => <GridItem classProp={type} key={id}><Link to={`/questions/${id}`} ><h2>{name}</h2></Link></GridItem>)
        }
    </div>
}