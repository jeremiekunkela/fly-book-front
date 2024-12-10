import React from "react";
import client from "../../api";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import styles from './LineChart.module.css';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
    const getStreamAxios = async () => {
        await client.get('/currencies/fetch-rates', {
            headers: {
                'Accept': 'text/event-stream',
            },
            responseType: 'stream',
            adapter: 'fetch',
        })
            .then(async (response) => {
                console.log('axios got a response');
                const stream = response.data;

                const reader = stream.pipeThrough(new TextDecoderStream()).getReader();
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    console.log(value);
                }
            })
    }

    console.log(getStreamAxios(), "FZFA A DFA DFA DFA");
    

    const data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Revenue",
                data: [10, 20, 30, 40, 50, 60, 70],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
            {
                label: "Expenses",
                data: [50, 40, 30, 20, 10, 5, 0],
                fill: false,
                borderColor: "rgb(255, 99, 132)",
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "bottom" },
            title: { display: true, text: "Monthly Revenue" },
        },
    };

    return (
        <div className={styles.container}>
            <h2>Graphics</h2>
            <Line data={data} options={options} className={styles.containerChart} />
        </div>
    );

};

export default LineChart;
