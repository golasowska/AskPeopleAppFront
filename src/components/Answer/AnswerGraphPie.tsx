import './AnswerGraph.scss';

import {QuestionInterface} from "../../interfaces/question-interface";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

import {Pie} from 'react-chartjs-2';
import {useEffect, useState} from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    formData: QuestionInterface;
}

export const AnswerGraphPie = (props: Props) => {

    const {name, answers} = props.formData;

    const [data, setData] = useState<any>({
        labels: [],
        datasets: [
            {
                label: '# of Votes',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 2,
            },
        ],
    });

    useEffect(() => {
            let labels: (string | number)[] = [];
            let data: number[] = [];
            let backgroundColor: string[] = [];
            let borderColor: string[] = [];
            answers.forEach(a => {
                labels = [...labels, a.text];
                data = [...data, a.votes];
                const color = `${Math.floor(Math.random() * 251)}, ${Math.floor(Math.random() * 251)}, ${Math.floor(Math.random() * 251)}`;
                backgroundColor = [...backgroundColor, `rgba(${color}, 0.5)`];
                borderColor = [...backgroundColor, `rgba(${color}, 1)`];
            });

            setData((prev: {
                labels: (string | number)[],
                datasets: [{
                    label: string, data: number[],
                    backgroundColor: string[],
                    borderColor: string[],
                    borderWidth: number,
                }]
            }) => ({
                ...prev, labels,
                datasets: [{...prev.datasets, data, backgroundColor, borderColor,borderWidth: 2,}]
            }));
        },
        []);

    return <div className="graph__container">
        <div className="graph__pie">
            <Pie data={data}/>
        </div>

    </div>
}