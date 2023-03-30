import {useEffect, useState} from "react";
import './Grid.scss';

import {GridItem} from "./GridItem";
import {Link} from "react-router-dom";

const questions = [
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
    const [cord, setCord] = useState<{ x: number, y: number }>({x: 0, y: 0});
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            setCord(data => ({...data, x: (e.clientX * 0.015), y: e.clientY * 0.015}));
        };
        document.addEventListener('mousemove', handler);
        return () => document.removeEventListener('mouseleave', handler);
    }, []);


    return <div className="grid">
        <GridItem cord={cord}>
            <Link to='/add' className="grid__item--new">+</Link>
        </GridItem>
        {
            questions.map(({id, text}, idx) => <GridItem key={id} cord={cord}><Link to={`/${id}`} >{text}</Link></GridItem>)
        }
    </div>
}