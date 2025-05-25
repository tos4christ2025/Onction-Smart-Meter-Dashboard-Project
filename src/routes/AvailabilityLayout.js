import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter';
import { Outlet } from 'react-router-dom';
import { getMockData } from '../utils/dataUtils';

class Availability_Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarVisible: window.innerWidth >= 768,
      data: null,
      isLoading: true,
      error: null,
      selectedZone: "Zone A",
      sidebarCollapsed: window.innerWidth >= 768 ? false : true,
      viewMode: "daily", // hourly, daily, weekly
      side_bar_width: window.innerWidth >= 768 ? "250px" : "60px",
      overflow: "overflow-scroll",
    };
  }

  componentDidMount() {
    this.fetchAvailability();
  }

  async fetchAvailability() {
    try {
      this.setState({ isLoading: true });
      const mockData = getMockData().availability;
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

  handleViewModeChange = (mode) => {
    this.setState({ viewMode: mode });
  };

  reportError(err) {
    console.error('Dashboard error:', err);
  }

  navigateToZone = (link) => {
    this.props.navigate(link);
  }

  render() {
    const { data, isLoading, error } = this.state;

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
    return (
      <div className="dashboard-container w-full" data-name="dashboard">          
          <main className="dashboard-container w-full" >
            <Outlet />
          </main>
      </div>
    );
  }
}

export default withRouter(Availability_Details);
