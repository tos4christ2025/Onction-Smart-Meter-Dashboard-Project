import React from 'react';
import { withRouter } from "../../utils/withRouter";
import PropTypes from 'prop-types';
import Sidebar from '../Sidebar/Sidebar';
import { getMockData } from '../../utils/dataUtils';

class AlertPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: [],
            side_bar_width: window.innerWidth >= 768 ? "250px" : "60px",
            overflow: "overflow-scroll",
            sidebarCollapsed: window.innerWidth >= 768 ? false : true,
        };
    }
    componentDidMount() {
        // Fetch Alerts or perform any setup here
        this.fetchAlerts();
    }
    fetchAlerts = async () => {
        try {
            const mockData = getMockData().alerts;
            this.setState({ alerts: mockData });
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error
            // this.reportError(error);
        }
    };
    componentDidCatch(error, info) {
        console.error('Error caught in AlertPanel:', error, info);
        // Handle error
        // this.reportError(error);
    }
    toggleSidebar = () => {
    this.setState((prevState) => ({ 
      sidebarCollapsed: !prevState.sidebarCollapsed,  
      side_bar_width: prevState.sidebarCollapsed ? "250px" : "60px",
      overflow: prevState.sidebarCollapsed ? "overflow-scroll" : "overflow-hidden-scroll",
    }));
  };

    render() {
        const { alerts, side_bar_width, sidebarCollapsed, overflow } = this.state;
        try {
            return (
                <>
                <Sidebar 
                    collapsed={sidebarCollapsed}
                    onToggleCollapse={this.toggleSidebar}
                    side_bar_width={side_bar_width}
                    overflow={overflow}                    
                />
                <div style={{marginLeft: this.state.side_bar_width}} className="card" data-name="alert-panel">
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
            </>
            );
        } catch (error) {
            console.error('AlertPanel component error:', error);
            reportError(error);
            return null;
        }
    }
}

// AlertPanel.propTypes = {
//     alerts: PropTypes.arrayOf(
//         PropTypes.shape({
//             type: PropTypes.oneOf(['warning', 'success']).isRequired,
//             title: PropTypes.string.isRequired,
//             message: PropTypes.string.isRequired
//         })
//     ).isRequired
// };

export default withRouter(AlertPanel);
