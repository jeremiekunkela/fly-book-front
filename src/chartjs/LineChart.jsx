import { useState, useEffect } from "react";
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
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const initialCounts = JSON.parse(localStorage.getItem("reservationCounts")) || {
        success: Array(12).fill(100),
        failed: Array(12).fill(100),
    };

    const [counts, setCounts] = useState(initialCounts);

    const [chartData, setChartData] = useState({
        labels: months,
        datasets: [
            {                
                display: false,
                data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
                visible: false,
                borderColor: "transparent",
                backgroundColor: 'transparent',
            },
            {
                label: "Success",
                data: counts.success,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                yAxisID: 'y',
            },
            {
                label: "Failed",
                data: counts.failed,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y',
            },
        ],
    });

    useEffect(() => {
        const eventSource = new EventSource(`${import.meta.env.VITE_SERVER_URL}/v1/realtime/reservation`);

        eventSource.onmessage = (event) => {
            try {
                const eventType = event.data;
                const currentMonth = new Date().getMonth();

                setCounts((prevCounts) => {
                    const updatedCounts = {
                        success: [...prevCounts.success],
                        failed: [...prevCounts.failed],
                    };

                    if (eventType === "success") {
                        updatedCounts.success[currentMonth] += 1;
                    } else if (eventType === "failed") {
                        updatedCounts.failed[currentMonth] += 1;
                    }

                    localStorage.setItem("reservationCounts", JSON.stringify(updatedCounts));

                    setChartData((prevChartData) => ({
                        ...prevChartData,
                        datasets: [
                            {
                                ...prevChartData.datasets[0],
                                data: updatedCounts.success.map(count =>
                                    count >= 0 && count <= 10 ? count * 8 : count
                                ),
                            },
                            {
                                ...prevChartData.datasets[1],
                                data: updatedCounts.failed.map(count =>
                                    count >= 0 && count <= 10 ? count * 8 : count 
                                ),
                            },
                        ],
                    }));

                    return updatedCounts;
                });
            } catch (error) {
                console.error("Erreur lors du traitement des données :", error);
            }
        };

        eventSource.onerror = (error) => {
            console.error("Erreur SSE :", error);
            eventSource.close();
        };

        return () => eventSource.close();
    }, [counts]);

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Monthly Success vs Failed Transactions',
            },
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
            },
            y1: {
                type: 'linear',
                display: false,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    return (
        <div className={styles.container}>
            <h2>Graphics</h2>
            <Line data={chartData} options={options} className={styles.containerChart} />
        </div>
    );
};

export default LineChart;
