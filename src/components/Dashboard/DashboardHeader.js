import React from 'react';
import PropTypes from 'prop-types';
import chartUtils from '../../utils/chartUtils';

function DashboardHeader({ totalUsage, savings, dashboardCompute }) {
    const { totalEnergy, totalUptime, totalEnergyTime, totalMW } =dashboardCompute;
    try {
        return (
            <div className="mb-6" data-name="dashboard-header">
                <div className="flex justify-between items-center mb-4 grid grid-cols-1 md:grid-cols-2 gap-4" data-name="header-content">
                    <h1 className="text-2xl font-bold" data-name="dashboard-title">Onction Energy Dashboard</h1>
                    <div className="flex items-center space-x-4" data-name="header-actions">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" data-name="export-button">
                            <i className="fas fa-download mr-2"></i>
                            Export Report
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors" data-name="refresh-button">
                            <i className="fas fa-sync-alt mr-2"></i>
                            Refresh
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-name="summary-cards">
                    <div className="card" data-name="total-usage-card">
                        <div className="text-gray-600 mb-1" data-name="card-label">Total MW</div>
                        <div className="text-2xl font-bold" data-name="card-value">{chartUtils.formatNumber(totalMW)} MW</div>
                        <div className={`text-sm ${totalUsage.change >= 0 ? 'text-red-600' : 'text-green-600'}`} data-name="card-change">
                            <i className={`fas ${totalUsage.change >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'} mr-1`}></i>
                            {Math.abs(totalUsage.change)}% vs last week
                        </div>
                        <div>{(totalEnergyTime)}Hrs</div>
                    </div>
                    <div className="card" data-name="savings-card">
                        <div className="text-gray-600 mb-1" data-name="card-label">Total Energy</div>
                        <div className="text-2xl font-bold" data-name="card-value">{chartUtils.formatNumber(totalEnergy/1000)} MWh</div>
                        <div className="text-sm text-green-600" data-name="card-change">
                            <i className="fas fa-arrow-up mr-1"></i>
                            {savings.percentage}% this month
                        </div>
                        <div>{(totalEnergyTime)}Hrs</div>
                    </div>
                    <div className="card" data-name="savings-card">
                        <div className="text-gray-600 mb-1" data-name="card-label">Average Available</div>
                        <div className="text-2xl font-bold" data-name="card-value">{chartUtils.formatNumber(totalUptime/22)} Hrs</div>
                        <div className="text-sm text-green-600" data-name="card-change">
                            <i className="fas fa-arrow-up mr-1"></i>
                            {savings.percentage}% this month
                        </div>
                        <div>{(totalEnergyTime)}Hrs</div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('DashboardHeader component error:', error);
        reportError(error);
        return null;
    }
}

DashboardHeader.propTypes = {
    totalUsage: PropTypes.shape({
        value: PropTypes.number.isRequired,
        change: PropTypes.number.isRequired
    }).isRequired,
    savings: PropTypes.shape({
        value: PropTypes.number.isRequired,
        percentage: PropTypes.number.isRequired
    }).isRequired
};

export default DashboardHeader;
