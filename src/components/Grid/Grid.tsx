import {useEffect, useState} from "react";
import './Grid.scss';
import {SimpleQuestionEntity} from 'types';

import {GridItem} from "./GridItem";
import {Link} from "react-router-dom";

const questionss = [
    {
        "id": 123,
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque debitis, enim id illo iure rerum saepe tempora.",
    },
    {
        "id": 124,
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque debitis, enim id illo iure rerum saepe tempora.",
    },
    {
        "id": 125,
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque debitis, enim id illo iure rerum saepe tempora.",
    },
    {
        "id": 126,
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque debitis, enim id illo iure rerum saepe tempora.",
    },
    {
        "id": 127,
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque debitis, enim id illo iure rerum saepe tempora.",
    },
    {
        "id": 128,
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque debitis, enim id illo iure rerum saepe tempora.",
    },
    {
        "id": 129,
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque debitis, enim id illo iure rerum saepe tempora.",
    },
    {
        "id": 130,
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque debitis, enim id illo iure rerum saepe tempora.",
    },

]

export const Grid = () => {
    const [questions, setQuestions] = useState<SimpleQuestionEntity[]>([]);

    useEffect(() => {
        ( async() => {
            const res = await fetch('http://localhost:3001/questions');
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