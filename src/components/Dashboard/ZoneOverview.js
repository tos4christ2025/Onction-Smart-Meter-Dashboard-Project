import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from '../../utils/withRouter';

// 

class ZoneOverview extends React.Component {
    constructor(props) {
        super(props);
    }
   
    componentDidCatch(error, info) {
        console.error('Error caught in ZoneOverview:', error, info);
        reportError(error);
    }

    render() {
        const { zones } = this.props;
        if (!zones || zones.length === 0) {
            return <div className="text-center text-gray-500">No zones available</div>;
        }
        try {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-name="zone-overview">
                {zones.map((zone, index) => (
                    <div key={index} className="card m-0 p-1 flex flex-col justify-between relative w-full max-w-sm" data-name="zone-card">
                        <div className="flex justify-between items-center mb-2 flex-wrap" data-name="zone-header">
                            <h3 className="text-lg font-semibold" data-name="zone-title">{zone.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-sm ${
                                zone.status === 'normal' ? 'bg-green-100 text-green-800' : 
                                zone.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                            }`} data-name="zone-status">
                                {zone.status}
                            </span>
                        </div>
                        <div className="space-y-1" data-name="zone-metrics">
                            <div className="flex justify-between" data-name="current-usage">
                                <span className="text-gray-600">Current Usage:</span>
                                <span className="font-medium">{zone.currentUsage} MWh</span>
                            </div>
                            <div className="flex justify-between" data-name="daily-average">
                                <span className="text-gray-600">Daily Average:</span>
                                <span className="font-medium">{zone.dailyAverage} MWh</span>
                            </div>
                            <div className="flex justify-between" data-name="peak-demand">
                                <span className="text-gray-600">Peak Demand:</span>
                                <span className="font-medium">{zone.peakDemand} MW</span>
                            </div>
                        </div>
                        {/* View More Button */}
                        <div className="flex justify-end mt-3">
                            <a 
                                onClick={(e) => {
                                    this.props.navigate(`/dashboard/${zone.name.toLowerCase()}`);
                                }} 
                                className="px-2 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center">
                            View More
                            {/* <span className="ml-1 px-2 py-0.5 text-xs bg-blue-200 text-blue-800 rounded-full">🔍</span> */}
                            </a>
                        </div>
                    </div>
                ))}
                
            </div>
        );
        } catch (error) {
            console.error('ZoneOverview component error:', error);
            reportError(error);
            return null;
        }
    }
   
}

ZoneOverview.propTypes = {
    zones: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            status: PropTypes.oneOf(['normal', 'warning', 'error']).isRequired,
            currentUsage: PropTypes.string.isRequired,
            dailyAverage: PropTypes.string.isRequired,
            peakDemand: PropTypes.string.isRequired
        })
    ).isRequired
};

export default withRouter(ZoneOverview);
