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
        }
    };
};

export default { getMockData };
