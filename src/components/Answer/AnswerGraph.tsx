import './AnswerGraph.scss';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

import {useContext, useEffect, useState} from "react";
import {QuestionEntity} from 'types';
import {ThemeContext} from "../../contexts/theme.context";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
);

interface Props {
    formData: QuestionEntity;
}

export const AnswerGraph = (props: Props) => {

    const {theme} = useContext(ThemeContext);
    const {answers} = props.formData;

    const color = theme === 'light' ? '#000' : '#fff';

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                ticks: {
                    precision: 0,
                    font: {
                        size: 18,
                    },
                    color,
                },
                grid: {
                    color,
                    borderColor: color,
                    lineWidth: 2,
                }
            },
            x: {
                ticks: {
                    font: {
                        size: 18
                    },
                    color,
                },
                grid: {
                    color,
                    borderColor: color,
                    lineWidth: 2,
                },
            }
        },
    };


    const [data, setData] = useState<any>({
        labels: [],
        datasets: [
            {
                label: '',
                data: [],
                backgroundColor: [],
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
                datasets: [{...prev.datasets, data, backgroundColor, borderColor, borderWidth: 2,}]
            }));
        },
        [answers]);

    return <div className="graph__container">
        <div className="graph__bar">
            <Bar options={options} data={data}/>
        </div>

    </div>

}