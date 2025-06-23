import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter';

class DashboardZoneDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        isLoading: true,
        error: null,
        selectedZone: "Zone A",
        sidebarCollapsed: window.innerWidth >= 768 ? false : true,
        side_bar_width: this.props.side_bar_width,
        overflow: "overflow-scroll",
        serverData: JSON.parse(localStorage.getItem('serverData')) || null,
        };
    }
    componentDidMount() {
        window.addEventListener("serverData", this.handleServerDataChange);
    }
    componentWillUnmount() {
        window.removeEventListener("serverData", this.handleServerDataChange);
    }
    handleServerDataChange = () => {
      this.setState({
          serverData: JSON.parse(localStorage.getItem("serverData")) || null
      });
    };
    reportError(err) {
        console.error('Dashboard error:', err);
    }

  render() {
    const zoneId = this.props.params.zoneId;
    // Calculate the app_zone_data
    const { serverData } = this.state;
    const zone_feeders = [];
    if(serverData) {
        serverData.forEach(element => {
            if(!element.name) {
                return;
            }
            const zone_name = element.name;
            if(zone_name.toLowerCase() == zoneId) {      
                const { trading_points } = element;
                trading_points.forEach( t_p => {
                    const { feeders } = t_p;
                    feeders.forEach( feeder => {
                        zone_feeders.push(feeder.data);
                    });
                });
            }
        });
    }
    const { error } = this.state;
    if(zone_feeders.length === 0) {
      console.error("No zones found for the given zoneId:", zoneId);
        return (
            <div style={{width: "50%", margin: "0 auto"}} className="flex justify-center items-center h-screen text-red-500" data-name="error">
            <div className="text-center">
            <i className="fas fa-exclamation-triangle fa-3x mb-4"></i>
            <p>No data available for the selected zone.</p>
            </div>
            </div>
        )
    }
    if (error) {
      return (
        <div style={{width: "50%", margin: "0 auto"}} className="flex justify-center items-center h-screen text-red-500" data-name="error">
          <div className="text-center">
            <i className="fas fa-exclamation-triangle fa-3x mb-4"></i>
            <p>Error loading dashboard data</p>
          </div>
        </div>
      );
    }

    try {
        return (
            <div style={{padding: "50px"}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-name="zone-overview">
                <button
                        onClick={() => this.props.navigate('/dashboard')}
                        className="mb-4 text-sm bg-gray-300 px-2 py-1 rounded"
                        style={{ position: "fixed", top: 6, left: 264 }}
                    >
                        Back to Dashboard
                </button>
                {zone_feeders.map((zone, index) => {
                const name = zone.feederName;
                return (
                    <div key={index} className="card m-0 p-1 flex flex-col justify-between relative w-full max-w-sm" data-name="zone-card">
                        <div className="flex justify-between items-center mb-2 flex-wrap" data-name="zone-header">
                            <h3 className="text-lg font-semibold" data-name="zone-title">{name? name : ''}</h3>
                            <span className={`px-2 py-1 rounded-full text-sm ${
                                zone?.status == 1 ? 'bg-green-100 text-green-800' : 
                                zone?.status == 0 ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                            }`} data-name="zone-status">
                                {zone?.status == 1 ? 'Online' : 'Offline'}
                            </span>
                        </div>
                        <div className="space-y-1" data-name="zone-metrics">
                            <div className="flex justify-between" data-name="current-usage">
                                <span className="text-gray-600">Current Usage:</span>
                                <span className="font-medium">{((zone?.actualEnergyConsumption)/1000).toFixed(2)} MWh</span>
                            </div>
                            <div className="flex justify-between" data-name="daily-average">
                                <span className="text-gray-600">Daily Average:</span>
                                <span className="font-medium">{(zone?.averagePower/1000).toFixed(2)} MW</span>
                            </div>
                            <div className="flex justify-between" data-name="peak-demand">
                                <span className="text-gray-600">Peak Demand:</span>
                                <span className="font-medium">{(zone?.averagePower/1000).toFixed(2)} MW</span>
                            </div>
                        </div>
                        
                    </div>
                 )})}
                
            </div>
        );
        } catch (error) {
            console.error('ZoneOverview component error:', error);
            reportError(error);
            return null;
        }
  }
}

export default withRouter(DashboardZoneDetails);
