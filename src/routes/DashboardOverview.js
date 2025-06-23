import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter';
import EnergyUsageChart from '../components/Charts/EnergyUsageChart';
import ZoneComparisonChart from '../components/Charts/ZoneComparisonChart_Class';
import EnergyFlowDiagram from '../components/Charts/EnergyFlowDiagram';
import ZoneOverview from '../components/Dashboard/ZoneOverview';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { getMockData } from '../utils/dataUtils';

class DashboardOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null,
      selectedZone: "Zone A",
      sidebarCollapsed: window.innerWidth >= 768 ? false : true,
      viewMode: "daily", // hourly, daily, weekly
      side_bar_width: window.innerWidth >= 768 ? "250px" : "60px",
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
  toggleSidebar = () => {
    this.setState((prevState) => ({ 
      sidebarCollapsed: !prevState.sidebarCollapsed,  
      side_bar_width: prevState.sidebarCollapsed ? "250px" : "60px",
      overflow: prevState.sidebarCollapsed ? "overflow-scroll" : "overflow-hidden-scroll",
    }));
  };
  toggleSection = (section) => {
    this.setState((prevState) => ({ [section]: !prevState[section] }));
  };
  handleViewModeChange = (mode) => {
    this.setState({ viewMode: mode });
  };
  reportError(err) {
    console.error('Dashboard error:', err);
  }

  render() {
    // Build the complete data
    const { serverData } = this.state;
    const data = getMockData();
    
    const serverDashboardCompute = {};
    const server_zones_data = [];
    const server_dashboard_data = {
      data
    };
    if(serverData) {
      server_dashboard_data.totalAvgMW = serverData[0]?.totalAvgMW;
      server_dashboard_data.totalEnergy = serverData[0]?.totalEnergy;
      serverDashboardCompute.totalMW = serverData[0]?.totalMW;
      serverDashboardCompute.avgUptime = serverData[0]?.totalUptime;
      serverDashboardCompute.totalEnergy = serverData[0]?.totalEnergy;
      serverDashboardCompute.totalAvgMW = serverData[0]?.totalAvgMW;
      serverDashboardCompute.totalEnergyTime = new Date(serverData[0]?.timestamp).toLocaleTimeString();
      serverDashboardCompute.energy_for_zone = {}
      serverData.forEach( server_data => {
        if(server_data.name) {
          const zones_obj = {};
          const zone_name = server_data.name;
          zones_obj.name = zone_name;
          zones_obj.status = server_data.status ? "normal" : "warning";
          zones_obj.currentUsage = server_data.energy.toFixed(2);
          zones_obj.dailyAverage = (server_data.totalAvg/1000).toFixed(2);
          zones_obj.peakDemand = server_data.totalMW.toFixed(2);
          server_zones_data.push(zones_obj);
          serverDashboardCompute.energy_for_zone[zone_name] = server_data.energy;
        }
      });
    }
    server_dashboard_data.zones_data = server_zones_data;

    const { error } = this.state;

    const { energy_for_zone } = serverDashboardCompute || {};    

    const isFirstLoading = !serverData;

     if (isFirstLoading) {
       return (
        <div style={{width: "50%", margin: "0 auto"}}  className="flex flex-col justify-center items-center h-screen" data-name="loading">
          <i className="fas fa-spinner fa-spin fa-3x text-blue-500"></i>
          <br />
          <p className='text-blue-500 text-3xl mt-4'>Initializing Dashboard</p>
        </div>
      );
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

    if (!serverDashboardCompute || server_zones_data.length==0) return null;

    const energyFlow = {
        nodes: ['Main Grid', 'Bauchi', 'Gombe', 'Makari Jos', 'Zaria Road Jos', 'Yandev Gboko', 'Storage'],
        links: [
            { source: 0, target: 1, value: (energy_for_zone? energy_for_zone['Bauchi']/1000 : 0) },
            { source: 0, target: 2, value: (energy_for_zone? energy_for_zone['Gombe']/1000 : 0) },
            { source: 0, target: 3, value: (energy_for_zone? energy_for_zone['Makari Jos']/1000 : 0) },
            { source: 0, target: 4, value: (energy_for_zone? energy_for_zone['Zaria Road jos']/1000 : 0) },
            { source: 0, target: 5, value: (energy_for_zone? energy_for_zone['Yandev Gboko']/1000 : 0) },
            { source: 0, target: 6, value: 5 }
        ]
    }

    return (
      <div className="main-content grid grid-cols-1 overflow-auto" data-name="main-content">    
        <DashboardHeader 
          totalUsage={data.totalUsage}
          savings={data.savings}
          dashboardCompute={serverDashboardCompute}
        />

        {/* <ZoneOverview zones={data.zones} /> */}
          <ZoneOverview zones={server_zones_data} dashboardCompute={serverDashboardCompute} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6" data-name="charts-grid">
          <EnergyUsageChart data={data.energyUsage} />
          <ZoneComparisonChart data={data.zoneComparison} />
        </div>

        <EnergyFlowDiagram data={energyFlow} />
      </div>
    );
  }
}

export default withRouter(DashboardOverview);
