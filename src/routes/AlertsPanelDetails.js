import React from 'react';
import { withRouter } from "../utils/withRouter";
import PropTypes from 'prop-types';
import { getMockData } from '../utils/dataUtils';

class AlertPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: [],
        };
    }
    componentDidMount() {
        // Fetch Alerts or perform any setup here
        this.fetchAlerts();
    }
    
    componentDidCatch(error, info) {
        console.error('Error caught in AlertPanel:', error, info);
        // Handle error
        // this.reportError(error);
    }

     async fetchAlerts() {
        try {
          this.setState({ isLoading: true });
          const mockData = getMockData().alerts;
          this.setState({ alerts: mockData });
        } catch (err) {
          this.setState({ error: err });
          this.reportError(err);
        } finally {
          this.setState({ isLoading: false });
        }
      }

    render() {
        const { alerts } = this.state;
        try {
            return (
                <>                
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
