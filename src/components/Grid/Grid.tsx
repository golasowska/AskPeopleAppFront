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
    // @TODO - when using tags, dependency = tag

    return <div className="grid">
        <GridItem>
            <Link to='/questions/add' className="grid__item--new">+</Link>
        </GridItem>
        {
            questions.map(({id, name}, idx) => <GridItem key={id}><Link to={`/questions/${id}`} ><h2>{name}</h2></Link></GridItem>)
        }
    </div>
}