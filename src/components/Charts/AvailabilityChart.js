import React, { Component, createRef } from 'react';
import { withRouter } from '../../utils/withRouter';
import {
    Chart,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
} from 'chart.js/auto';

// Register all needed elements
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

class AvailabilityChart extends Component {
    constructor(props) {
        super(props);
        this.chartRef = createRef();
        this.chartInstance = null;
        this.state = {
            pathname: '/'
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.initializeChart();
        }, 0);
        const pathname = this.props.location.pathname
        this.setState({pathname});
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

    navigateToZone = (link) => {
        this.props.navigate(link);
    }

    initializeChart() {
        const { data } = this.props;
        const canvas = this.chartRef.current;
        if (!canvas || !data) {
            console.error('Chart canvas reference is null');
            return;
        }
        if (canvas && data) {
            if (this.chartInstance) {
                this.chartInstance.destroy();
            }

            const ctx = canvas.getContext('2d');
            if(!ctx) {  
                console.error('Failed to acquire canvas context');
                return;
            }
            this.chartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.labels,
                    datasets:data.datasets,
                    borderColor: '#000',
                    borderWidth: 1
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    elements: {
                        bar: {
                            borderWidth: 2
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: data.title,
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: data.y_title
                            },
                            grid: {
                                color: '#e5e7eb',
                                lineWidth: 1
                            },
                            stacked: true
                        },
                        x: {
                            title: {
                                display: true,
                                text: data.x_title
                            },
                            grid: {
                                color: '#e5e7eb',
                                lineWidth: 1
                            },
                             stacked: true
                        }                        
                    },
                    onClick: (event, elements, chart) => {
                        // Handle click event
                        if (elements.length > 0) {
                            const element = elements[0];
                            const datasetIndex = element.datasetIndex;
                            const dataIndex = element.index;
                            const categoryLabel = chart.data.labels[dataIndex];
                            const location = categoryLabel.toLowerCase().replace(/ /g, "-");                            
                            const { pathname } = this.state;
                            // console.log(location, pathname)
                            if(pathname == '/availability' && location !== pathname) {
                                const newLocation = (pathname+'/'+location);
                                this.navigateToZone(newLocation);
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
                <div className="card ml-3 w-full" data-name="zone-comparison-chart">
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

export default withRouter(AvailabilityChart);