// BookChart.js
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import this to automatically register chart.js components
import './Forms.css'

const Statistics = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
            {
                label: '',
                backgroundColor: 'green',
                data: [30, 40, 25, 35]
            },
            {
                label: '',
                backgroundColor: 'blue',
                data: [25, 35, 20, 30]
            },
            {
                label: '',
                backgroundColor: 'red',
                data: [35, 45, 30, 40]
            },
            {
                label: '',
                backgroundColor: 'yellow',
                data: [20, 30, 15, 25]
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'right'
            }
        }
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    return (
        <div className="containerChar">
            <div style={{display:'flex', flexDirection:'column'}}>
                <div className="date-filters">
                    <label htmlFor="start-date">من:</label>
                    <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />
                    <label htmlFor="end-date">الى:</label>
                    <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />
                </div>
                <div className="legend">
                    <p><span style={{ color: 'green', height:"10px", width:'10px', backgroundColor:'green', borderRadius:'50%' }}></span> كتاب</p>
                    <p><span style={{ color: 'blue', height:"10px", width:'10px', backgroundColor:'blue', borderRadius:'50%' }}></span> مذكرة</p>
                    <p><span style={{ color: 'red', height:"10px", width:'10px', backgroundColor:'red', borderRadius:'50%' }}></span> طلب</p>

                    <p><span style={{ color: 'yellow', height:"10px", width:'10px', backgroundColor:'yellow', borderRadius:'50%' }}></span> اجازة</p>
                </div>
            </div>
            <div>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default Statistics;
