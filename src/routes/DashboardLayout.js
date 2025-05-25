import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { withRouter } from '../utils/withRouter';
import Sidebar from '../components/Sidebar/Sidebar';
import EnergyUsageChart from '../components/Charts/EnergyUsageChart';
import ZoneComparisonChart from '../components/Charts/ZoneComparisonChart_Class';
import EnergyFlowDiagram from '../components/Charts/EnergyFlowDiagram';
// import AlertPanel from '../components/Dashboard/AlertPanel';
import ZoneOverview from '../components/Dashboard/ZoneOverview';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { getMockData } from '../utils/dataUtils';

class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      error: null,
      selectedZone: "Zone A",
      sidebarCollapsed: window.innerWidth >= 768 ? false : true,
      showUsageChart: true,
      showAlerts: true,
      showEnergyFlow: true,
      viewMode: "daily", // hourly, daily, weekly
      side_bar_width: window.innerWidth >= 768 ? "250px" : "60px",
      overflow: "overflow-scroll",
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      this.setState({ isLoading: true });
      const mockData = getMockData();
      this.setState({ data: mockData });
    } catch (err) {
      this.setState({ error: err });
      this.reportError(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }
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
    const { data, isLoading, error } = this.state;
    const {
      selectedZone,
      sidebarCollapsed,
      showUsageChart,
      showAlerts,
      showEnergyFlow,
      viewMode,
      side_bar_width,
    } = this.state;

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

    if (!data) return null;

    return (
      <div className="dashboard-container" data-name="dashboard">
        {/* <div className="sidebar" data-name="sidebar"> */}
          <Sidebar 
            collapsed={sidebarCollapsed}
            onToggleCollapse={this.toggleSidebar}
            onToggleSection={this.toggleSection}
            side_bar_width={side_bar_width}
            overflow={this.state.overflow}
            sections={{
              showUsageChart,
              showAlerts,
              showEnergyFlow,
            }}
            onSelectZone={(zone) => this.setState({ selectedZone: zone })}
          />
        {/* </div> */}
        <main style={{marginLeft:{side_bar_width}}} className='dashboard-main w-full'>
            <Outlet side_bar_width={side_bar_width} />
        </main>
      </div>
    );
  }
}

// export default withRouter(DashboardLayout);
export default DashboardLayout;
