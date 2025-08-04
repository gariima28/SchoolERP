import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, LineElement, ArcElement, PointElement, Filler
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { getAllDashDataApi, getAttendanceGraphDataApi } from 'src/Utils/Apis';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, LineElement, ArcElement, PointElement, Filler);

const BarChart = ({ graphKey, graphFilterShow }) => {

    const role = localStorage.getItem('loggedInUserRole');
    const navigate = useNavigate();
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Go Attendance',
                data: [],
                backgroundColor: '#A7C883',
                borderRadius: 5,
            }
        ]
    });

    const [xAxis, setXAxis] = useState([])
    const [yAxis, setYAxis] = useState([])

    const options = {
        responsive: true,
        layout: {
            padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
            },
        },
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            x: {
                grid: {
                    display: true,
                    color: '#F3F9F8',
                },
                ticks: {
                    color: '#000',
                },
                border: {
                    color: '#008479',
                },
            },
            y: {
                grid: {
                    display: true,
                    color: '#F3F9F8',
                },
                ticks: {
                    color: '#000',
                },
                beginAtZero: true,
                max: 200,
                border: {
                    color: '#008479',
                },
            },
        }
    };

    useEffect(() => {
        if (role === 'ADMIN') {
            getAllDashData();
        }
    }, [graphKey]);

    const handleFilterShow = () => {
        graphFilterShow(false)
    }

    const getAllDashData = async () => {
        try {
            var response = await getAllDashDataApi(graphKey ? graphKey : 'TODAY', '', '', '');
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setXAxis(response?.data?.data?.attendance?.chart?.xAxis);
                    setYAxis(response?.data?.data?.attendance?.chart?.yAxis);
                    handleFilterShow()
                    setData({
                        labels: xAxis.map(x => `${x}`),
                        datasets: [
                            {
                                label: 'Go Attendance',
                                data: yAxis,
                                backgroundColor: '#A7C883',
                                borderRadius: 5,
                            }
                        ]
                    });
                }
            }
            else {
                // console.log(response?.data?.message);
            }
        }
        catch (error) {
            console.error('Error fetching student data:', error);
            if (error?.response?.data?.statusCode === 401) {
                localStorage.removeItem('token')
                setTimeout(() => {
                    navigate('/')
                }, 200);
            }
        }
    }


    return (

        <>
            <div className="chart-container" style={{ height: xAxis.length > 0 || yAxis.length > 0 ? '18em' : '50%' }}>
                {xAxis.length > 0 || yAxis.length > 0
                    ?
                    <Bar data={data} options={options}></Bar>
                    :
                    <div className="d-flex justify-content-center p-5 m-5">
                        {/* <img src="/images/search.svg" alt="" className='img-fluid' /> */}
                        <span>No Attendance Data Yet !!!</span>
                    </div>
                }
            </div>
        </>
    );
}

export default BarChart;









// const data = {
//     labels: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven'],
//     datasets: [
//         {
//             label: 'Go Attendance',
//             data: [20, 50, 35, 75, 65, 120, 200, 100, 60, 180, 85],
//             backgroundColor: '#A7C883',
//             borderRadius: 5,
//         }
//     ]
// };

// const options = {
//     responsive: true,
//     layout: {
//         padding: {
//             top: 10,
//             bottom: 10,
//             left: 10,
//             right: 10,
//         },
//     },
//     plugins: {
//         legend: {
//             display: false,
//         }
//     },
//     scales: {

//         x: {
//             grid: {
//                 display: true,
//                 color: '#F3F9F8',
//             },
//             ticks: {
//                 color: '#000',
//             },
//             border: {
//                 color: '#008479',
//             },
//         },
//         y: {
//             grid: {
//                 display: true,
//                 color: '#F3F9F8',

//             },
//             ticks: {
//                 color: '#000',
//             },
//             beginAtZero: true,
//             max: 200,
//             border: {
//                 color: '#008479',
//             },
//         },
//     }
// };
