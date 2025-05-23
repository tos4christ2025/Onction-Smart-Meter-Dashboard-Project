import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import EnergyUsageChart from '../components/Charts/EnergyUsageChart';
import ZoneComparisonChart from '../components/Charts/ZoneComparisonChart_Class';
import EnergyFlowDiagram from '../components/Charts/EnergyFlowDiagram';
import AlertPanel from '../components/Dashboard/AlertPanel';
import ZoneOverview from '../components/Dashboard/ZoneOverview';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { getMockData } from '../utils/dataUtils';

function Dashboard() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const mockData = getMockData();
                setData(mockData);
            } catch (err) {
                setError(err);
                reportError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen" data-name="loading">
                <i className="fas fa-spinner fa-spin fa-3x text-blue-500"></i>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500" data-name="error">
                <div className="text-center">
                    <i className="fas fa-exclamation-triangle fa-3x mb-4"></i>
                    <p>Error loading dashboard data</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <div className="dashboard-container" data-name="dashboard">
            <div className="sidebar" data-name="sidebar">
                <Sidebar />
            </div>
            {/* <Sidebar /> */}
            <div className="main-content" data-name="main-content">
                <DashboardHeader 
                    totalUsage={data.totalUsage}
                    savings={data.savings}
                />
                
                <ZoneOverview zones={data.zones} />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6" data-name="charts-grid">
                    <EnergyUsageChart data={data.energyUsage} />
                    <ZoneComparisonChart data={data.zoneComparison} />
                </div>
                
                <EnergyFlowDiagram data={data.energyFlow} />
                
                <AlertPanel alerts={data.alerts} />
            </div>
        </div>
    );
}

export default Dashboard;
