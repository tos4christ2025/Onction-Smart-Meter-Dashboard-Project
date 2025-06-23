import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter';
// import { Outlet } from 'react-router-dom';
import AvailabilityChart from '../components/Charts/AvailabilityChart';
import { ZoneSidebar } from '../components/Sidebar/ZoneSidebar';
import { PowerDataTable } from '../components/Tables/PowerTable_Zones';

class Availability_Overview extends Component {
  constructor(props) {
    super(props);
    this.showComponent = this.showComponent.bind(this);
    this.handleServerDataChange = this.handleServerDataChange.bind(this);
    this.state = {
      sidebarVisible: window.innerWidth >= 768,
      sidebarCollapsed: window.innerWidth >= 768 ? false : true,
      viewMode: "daily", // hourly, daily, weekly
      side_bar_width: window.innerWidth >= 768 ? "250px" : "60px",
      overflow: "overflow-scroll",
      selectedZone: null,
      showTable: true,
      showText: "Show Chart",
      showChart: false,
      isFirstLoading: false,
      isLoading: false,
      error: null,
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
  handleZoneChange = (zone) => {
    this.setState({ selectedZone: zone });
  }; 
  toggleSidebar = () => {
    this.setState((prevState) => ({ 
      sidebarCollapsed: !prevState.sidebarCollapsed,  
      side_bar_width: prevState.sidebarCollapsed ? "250px" : "60px",
      overflow: prevState.sidebarCollapsed ? "overflow-scroll" : "overflow-hidden-scroll",
    }));
  };
  handleViewModeChange = (mode) => {
    this.setState({ viewMode: mode });
  };
  reportError(err) {
    console.error('Dashboard error:', err);
  };
  navigateToZone = (link) => {
    this.props.navigate(link);
  };
  showComponent() {
    const {showChart, showTable} = this.state;
    if(showChart) {
      this.setState({showChart: false, showTable: true, showText: "Show Chart"});
    } else if(showTable) {
      this.setState({showChart: true, showTable: false, showText: "Show Table"});
    }
  };

  render() {
    // Build the complete data
    const { serverData } = this.state;
    // Get the total MW
    let totalMW = 0;
    const complete_server_data = [];
    if(serverData) {
      totalMW = serverData[0]?.totalMW;
      serverData.forEach( server_data => {
        if(server_data.name) {
          const zone_name = server_data.name;
          const { trading_points } = server_data;
          trading_points.forEach(t_p => {
            const t_p_name = t_p.name;
            const { feeders } = t_p;
            feeders.forEach( feeder => {
              const composed_feeder = {};
              const { data } = feeder;
              const date = new Date(data.timestamp).toLocaleDateString();
              const time = new Date(data.timestamp).toLocaleTimeString();
              composed_feeder.date = date;
              composed_feeder.time = time;
              composed_feeder.zone = zone_name;
              composed_feeder.trading_point = t_p_name;
              composed_feeder.name = data.feederName;
              composed_feeder.megawatts = data.power;
              composed_feeder.voltage = data.voltage1;
              composed_feeder.amperes = data.current1;
              composed_feeder.uptime = data.uptimeHours;
              composed_feeder.feederStatus = data.status ? "ON" : "OFF";
              composed_feeder.actualEnergyConsumption = data.actualEnergyConsumption;
              complete_server_data.push(composed_feeder);
            });
          });
        }
      });
    }
    
    const { isLoading, error } = this.state;
    const isFirstLoading = (!complete_server_data);
    const { showText } = this.state;
    const { selectedZone } = this.state;
    const uniqueZones = ["All", ...new Set(complete_server_data?.map((d) => d.zone))];
    const complete_chart_data = {}
    uniqueZones.forEach(zone => {
      if(zone !== 'All') complete_chart_data[zone] = complete_server_data?.filter( data => data.zone == zone);
    });
    if (isFirstLoading) {
       return (
        <div style={{width: "50%", margin: "0 auto"}}  className="flex flex-col justify-center items-center h-screen" data-name="loading">
          <i className="fas fa-spinner fa-spin fa-3x text-blue-500"></i>
          <br />
          <p className='text-blue-500 text-3xl mt-4'>Initializing Dashboard</p>
        </div>
      );
    }
    
    if (!complete_server_data) return null;
  
    return (
      <div  className="dashboard-container" data-name="dashboard">
          <div className="flex  overflow-auto">
            <div style={{zIndex: 1}} className="flex-2 p-3 bg-white overflow-auto">
              <ZoneSidebar
                zones={uniqueZones}
                selectedZone={selectedZone}
                onZoneChange={this.handleZoneChange}
              />
              <span>
                <button onClick={this.showComponent} className=" text-sm bg-gray-500 mt-4 p-2 border-4 rounded-md font-medium ">
                  <p style={{color: "white"}} className="p-1 rounded">{showText}</p>
                </button>
              </span>

              {isLoading && 
                (
                  <div style={{width: "50%", margin: "0 auto"}}  className="flex flex-col justify-center items-center" data-name="loading">
                    <i className="fas fa-spinner fa-spin fa-3x text-blue-500"></i>
                    <p className='text-blue-500 text-lg mt-4' >Updating</p>
                  </div>
                )
              }
              {error && 
                (
                  <div style={{width: "50%", margin: "0 auto"}} className="flex justify-center items-center text-red-500" data-name="error">
                    <div className="text-center">
                      <i className="fas fa-exclamation-triangle fa-3x mb-4"></i>
                      <p>Error loading dashboard data</p>
                    </div>
                  </div>
                )                    
              }
              <div className="text-gray-500 text-lg mt-2">
                <p>Total Load</p>
                {Number(totalMW).toFixed(2)} MW
                </div>
            </div>
           
            {this.state.showTable && (<div className="flex-1 p-5 bg-white overflow-scroll">
                <h1 className="text-2xl font-bold mb-4">
                  Power Monitoring Dashboard {selectedZone ? `- ${selectedZone}` : ""}
                </h1>
                <PowerDataTable data={complete_server_data} selectedZone={selectedZone} />
              </div>)}
            </div>
            {this.state.showChart && (<div style={{width: "700px"}} className="grid grid-cols-1  mt-10 mb-10 mr-2 overflow-auto" data-name="charts-grid">
              <AvailabilityChart complete_chart_data={complete_chart_data} selectedZone={selectedZone} />
            </div>)}
          
      </div>
    );
  }
}

export default withRouter(Availability_Overview);
