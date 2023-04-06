import './AnswerGraph.scss';

import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

import {Pie} from 'react-chartjs-2';
import {useEffect, useState} from "react";
import { QuestionEntity } from 'types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    formData: QuestionEntity;
}

export const AnswerGraphPie = (props: Props) => {

    const {answers} = props.formData;

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
            if (answers) {
                answers.forEach(a => {
                    labels = [...labels, a.text];
                    data = typeof a.votes === 'number' ? [...data, a.votes] : [];
                    const color = `${Math.floor(Math.random() * 251)}, ${Math.floor(Math.random() * 251)}, ${Math.floor(Math.random() * 251)}`;
                    backgroundColor = [...backgroundColor, `rgba(${color}, 0.5)`];
                    borderColor = [...backgroundColor, `rgba(${color}, 1)`];
                });
            }

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
        [answers]);

    return <div className="graph__container">
        <div className="graph__pie">
            <Pie data={data}/>
        </div>

    </div>
}