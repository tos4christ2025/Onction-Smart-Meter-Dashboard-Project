import React from 'react';
import { withRouter } from "../utils/withRouter";
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    // this.fetchAlerts();
    }
    
    componentDidCatch(error, info) {
        console.error('Error caught in AlertPanel:', error, info);
        // Handle error
        // this.reportError(error);
    }

    render() {
        const { alerts } = this.state;
        try {
            return (
                <>
                <div className="card" data-name="alert-panel">
                    <h3 className="text-lg font-semibold mb-4" data-name="alert-title">
                        <i className="fas fa-bell mr-2"></i>
                        Recent Alerts
                    </h3>
                    {<Outlet />}
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
