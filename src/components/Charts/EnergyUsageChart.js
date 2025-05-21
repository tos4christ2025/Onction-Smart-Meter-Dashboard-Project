import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function EnergyUsageChart({ data }) {
    const chartData = {
        labels: data.labels,
        datasets: [{
            label: 'Energy Usage (kWh)',
            data: data.values,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Energy Usage Over Time'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Energy (kWh)'
                }
            }
        }
    };

    return (
        <div className="card" data-name="energy-usage-chart">
            <div style={{ height: '300px' }}>
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
}

export default EnergyUsageChart;
