import React from 'react';
import PropTypes from 'prop-types';

function AlertPanel({ alerts }) {
    try {
        return (
            <div className="card" data-name="alert-panel">
                <h3 className="text-lg font-semibold mb-4" data-name="alert-title">
                    <i className="fas fa-bell mr-2"></i>
                    Recent Alerts
                </h3>
                <div className="space-y-4" data-name="alert-list">
                    {alerts.map((alert, index) => (
                        <div 
                            key={index}
                            className={`alert ${alert.type === 'warning' ? 'alert-warning' : 'alert-success'}`}
                            data-name="alert-item"
                        >
                            <div className="flex items-center" data-name="alert-content">
                                <i className={`fas ${alert.type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-check'} mr-2`}></i>
                                <div>
                                    <h4 className="font-semibold" data-name="alert-heading">{alert.title}</h4>
                                    <p className="text-sm" data-name="alert-message">{alert.message}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('AlertPanel component error:', error);
        reportError(error);
        return null;
    }
}

AlertPanel.propTypes = {
    alerts: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(['warning', 'success']).isRequired,
            title: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired
        })
    ).isRequired
};

export default AlertPanel;
