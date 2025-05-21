import React, { Component, createRef } from 'react';
import {
    Chart,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register all needed elements
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

class ZoneComparisonChart extends Component {
    constructor(props) {
        super(props);
        this.chartRef = createRef();
        this.chartInstance = null;
    }

    componentDidMount() {
        setTimeout(() => {
            this.initializeChart();
        }, 0);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.initializeChart();
        }
    }

    componentWillUnmount() {
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }
    }

    initializeChart() {
        const { data } = this.props;
        const canvas = this.chartRef.current;
        if (!canvas || !data) {
            console.error('Chart canvas reference is null');
            return;
        }
        if (this.chartRef.current && data) {
            if (this.chartInstance) {
                this.chartInstance.destroy();
            }

            const ctx = this.chartRef.current.getContext('2d');
            if(!ctx) {  
                console.error('Failed to acquire canvas context');
                return;
            }
            this.chartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.zones,
                    datasets: [
                        {
                            label: 'Current Usage (kWh)',
                            data: data.currentUsage,
                            backgroundColor: '#3b82f6'
                        },
                        {
                            label: 'Previous Usage (kWh)',
                            data: data.previousUsage,
                            backgroundColor: '#9ca3af'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: 'Zone Comparison'
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
                }
            });
        }
    }

    render() {
        try {
            return (
                <div className="card" data-name="zone-comparison-chart">
                    <canvas ref={this.chartRef} data-name="zone-comparison-canvas"></canvas>
                </div>
            );
        } catch (error) {
            console.error('ZoneComparisonChart component error:', error);
            reportError(error);
            return null;
        }
    }
}

export default ZoneComparisonChart;
