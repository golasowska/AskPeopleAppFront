import './AnswerGraph.scss';

import {QuestionInterface} from "../../interfaces/question-interface";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import {useEffect, useState} from "react";

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
);

interface Props {
    formData: QuestionInterface;
}

export const AnswerGraph = (props: Props) => {

    const {name, answers} = props.formData;

    const [data, setData] = useState<any>({
        labels: [],
        datasets: [
            {
                label: 'Dataset 1',
                data: [3, 77, 55, 99],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
        <div className="graph__bar">
            <Bar options={options} data={data} />
        </div>

    </div>
}