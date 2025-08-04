import React from 'react';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
    LineElement,
    ArcElement,
    PointElement,
    Filler
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
    LineElement,
    ArcElement,
    PointElement,
    Filler
);

const TeacherDashChart = ({ leaveData }) => {
    const options = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 14
                    },
                    boxWidth: 8,
                    padding: 10
                }
            }
        }
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {Array.isArray(leaveData) && leaveData?.map((leave, index) => {
                const data = {
                    labels: ['Available', 'Booked'],
                    datasets: [{
                        label: leave.leaveType,
                        data: [leave.leaveCount, leave.bookedCount],
                        backgroundColor: ['#FF914C', 'red'],
                        hoverOffset: 2
                    }]
                };

                return (
                    <div key={index} style={{ width: '100px', textAlign: 'center' }}>
                        <Doughnut data={data} options={options} />
                    </div>
                );
            })}
        </div>
    );
};

export default TeacherDashChart







