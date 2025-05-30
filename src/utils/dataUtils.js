import chartUtils  from './chartUtils';

export const getMockData = () => {
    return {
        totalUsage: {
            value: 2456.78,
            change: -12.5
        },
        savings: {
            value: 345.67,
            percentage: 15.8
        },
        zones: [
            {
                name: 'Zone A',
                status: 'normal',
                currentUsage: '45.6',
                dailyAverage: '42.3',
                peakDemand: '5.2'
            },
            {
                name: 'Zone B',
                status: 'warning',
                currentUsage: '78.9',
                dailyAverage: '65.4',
                peakDemand: '8.7'
            },
            {
                name: 'Zone C',
                status: 'normal',
                currentUsage: '32.1',
                dailyAverage: '30.8',
                peakDemand: '4.1'
            }
        ],
        alerts: [
            {
                type: 'warning',
                title: 'High Usage Alert',
                message: 'Zone B is showing unusually high energy consumption'
            },
            {
                type: 'success',
                title: 'Energy Saving Goal Achieved',
                message: 'Zone A has reached its monthly energy saving target'
            }
        ],
        energyUsage: {
            labels: chartUtils.generateTimeLabels(24),
            values: Array.from({ length: 24 }, () => Math.random() * 100)
        },
        zoneComparison: {
            zones: ['Zone A', 'Zone B', 'Zone C'],
            currentUsage: [45.6, 78.9, 32.1],
            previousUsage: [42.3, 65.4, 30.8]
        },
        energyFlow: {
            nodes: ['Main Grid', 'Zone A', 'Zone B', 'Zone C', 'Storage'],
            links: [
                { source: 0, target: 1, value: 20 },
                { source: 0, target: 2, value: 30 },
                { source: 0, target: 3, value: 15 },
                { source: 0, target: 4, value: 5 }
            ]
        },
        availability: {
            zones: ['Zone A', 'Zone B', 'Zone C'],
            zones_avg_uptime: [20, 18, 23],
            zones_avg_downtime: [4, 6, 1],
            zones_data: [
                {
                    name: 'Zone A',
                    status: 'available',
                    lastChecked: '2023-10-01T12:00:00Z',
                    feeders: {
                        name: ['Feeder 1', 'Feeder 2'],
                        status: ['available', 'available'],
                        uptime: [20, 15],
                        downtime: [4, 9], 
                    }
                },
                {
                    name: 'Zone B',
                    status: 'unavailable',
                    lastChecked: '2023-10-01T12:00:00Z',
                    feeders: {
                        name: ['Feeder 3', 'Feeder 4'],
                        status: ['available', 'unavailable'],
                        uptime: [22, 18],
                        downtime: [2, 6], 
                    }
                },
                {
                    name: 'Zone C',
                    status: 'available',
                    lastChecked: '2023-10-01T12:00:00Z',
                    feeders: {
                        name: ['Feeder 5', 'Feeder 6'],
                        status: ['available', 'available'],
                        uptime: [10, 14],
                        downtime: [14, 10], 
                    }
                }
            ],
            overallStatus: 'partially available'
        }
    };
};

export default { getMockData };
