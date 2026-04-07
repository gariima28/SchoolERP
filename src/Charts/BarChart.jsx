import React, { useEffect, useState, useMemo } from 'react';
import {
    Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getAllDashDataApi } from 'src/Utils/Apis';
import { useNavigate } from 'react-router-dom';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const BarChart = ({ graphKey, graphFilterShow }) => {
    const role = sessionStorage.getItem('loggedInUserRole');
    const navigate = useNavigate();

    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
    const [loading, setLoading] = useState(false);

    // ← Yeh best way hai: data ko useMemo se derive karo
    const chartData = useMemo(() => ({
        labels: xAxis.map(x => `${x}`),
        datasets: [
            {
                label: 'Go Attendance',
                data: yAxis,
                backgroundColor: '#A7C883',
                borderRadius: 5,
            }
        ]
    }), [xAxis, yAxis]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: { top: 10, bottom: 10, left: 10, right: 10 },
        },
        plugins: { legend: { display: false } },
        scales: {
            x: {
                grid: { color: '#F3F9F8' },
                ticks: { color: '#000' },
                border: { color: '#008479' },
            },
            y: {
                grid: { color: '#F3F9F8' },
                ticks: { color: '#000' },
                beginAtZero: true,
                max: 200,
                border: { color: '#008479' },
            },
        }
    };

    useEffect(() => {
        if (role !== 'ADMIN') return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getAllDashDataApi(graphKey || 'TODAY', '', '', '', '');

                if (response?.status === 200 && response?.data?.status === 'success') {
                    const att = response.data.data.attendance;

                    setXAxis(att?.chart?.xAxis || []);
                    setYAxis(att?.chart?.yAxis || []);

                    // Filter hide karne ke liye (tumhara purana logic)
                    graphFilterShow?.(false);
                }
            } catch (error) {
                console.error('Error fetching attendance graph:', error);
                if (error?.response?.data?.statusCode === 401) {
                    sessionStorage.removeItem('token');
                    navigate('/');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [graphKey, role, navigate, graphFilterShow]);

    const hasData = xAxis.length > 0 && yAxis.length > 0;

    return (
        <div className="chart-container" style={{ height: hasData ? '18em' : '50%' }}>
            {loading ? (
                <div className="d-flex justify-content-center p-5">
                    <span>Loading attendance chart...</span>
                </div>
            ) : hasData ? (
                <Bar data={chartData} options={options} />
            ) : (
                <div className="d-flex justify-content-center p-5 m-5">
                    <span className='text-danger'>No Attendance Data Yet !!!</span>
                </div>
            )}
        </div>
    );
};

export default BarChart;