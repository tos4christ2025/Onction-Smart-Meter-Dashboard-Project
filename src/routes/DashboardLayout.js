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
import '../styles/landing_page.css'

class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.hideLandingPage = this.hideLandingPage.bind(this);
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
      landing_page_view: ''
    };
  }

  componentDidMount() {
    this.fetchData();
    const { pathname } = this.props.location;
    if(pathname !== '/') this.setState({landing_page_view: 'none'});
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
    this.setState((prevState) => {
      if(prevState.sidebarCollapsed) {
        this.props.setSideBarWidth("250px");
      } else this.props.setSideBarWidth("60px");
      return ({ 
      sidebarCollapsed: !prevState.sidebarCollapsed,  
      side_bar_width: prevState.sidebarCollapsed ? "250px" : "60px",
      overflow: prevState.sidebarCollapsed ? "overflow-scroll" : "overflow-hidden-scroll",
    })
  });
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
  hideLandingPage() {
      this.setState({landing_page_view: 'none'});
  }

  render() {
    const { data, isLoading, error } = this.state;
    const {
      landing_page_view,
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
        <div onClick={this.hideLandingPage} data-name="sidebar">
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
        </div>
        <main  className='dashboard-main w-full' data-name="dashboard">
            <div style={{marginLeft: side_bar_width, display: landing_page_view}} className="landingpage_container h-screen">
              <h1>Welcome to Onction Energy Dashboard</h1>
              <p>Take control of your energy data and insights. Navigate through the sidebar to access real-time analytics, reports, and management tools.</p>
              <button className="cta">Go to Dashboard</button>
            </div>
            <Outlet />
        </main>
      </div>
    );
  }
}

// export default withRouter(DashboardLayout);
export default withRouter(DashboardLayout);
