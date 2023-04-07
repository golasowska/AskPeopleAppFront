import './AnswerGraph.scss';

import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

import {Pie} from 'react-chartjs-2';
import {useContext, useEffect, useState} from "react";
import { QuestionEntity } from 'types';
import {ThemeContext} from "../../contexts/theme.context";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    formData: QuestionEntity;
}

export const AnswerGraphPie = (props: Props) => {

    const {theme} = useContext(ThemeContext);
    const {answers} = props.formData;

    const color = theme === 'light' ? '#000' : '#fff';

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 20,
                    },
                    color,
                }
            },
        },
    };

    const [data, setData] = useState<any>({
        labels: [],
        datasets: [
            {
                label: '',
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
                    backgroundColor = [...backgroundColor, `rgb(${color})`];
                    borderColor = [...backgroundColor, `rgb(${color})`];
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
            <Pie data={data} options={options}/>
        </div>

    </div>
}