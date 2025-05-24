import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { withRouter } from '../utils/withRouter';
import Sidebar from '../components/Sidebar/Sidebar';
import AvailabilityChart from '../components/Charts/AvailabilityChart';
import { getMockData } from '../utils/dataUtils';
import Availability from './Availability Pages/Availability';

class Availability_Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      error: null,
      selectedZone: "Zone A",
      sidebarCollapsed: false,
      viewMode: "daily", // hourly, daily, weekly
      side_bar_width: "250px",
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
    const {
      sidebarCollapsed,
      viewMode,
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
    const zones_chart_data = {}
    const datasets = [
                        {
                            label: 'Uptime',
                            data: data.zones_avg_uptime,
                            backgroundColor: '#3b82f6'
                        },
                        {
                            label: 'Downtime',
                            data: data.zones_avg_downtime,
                            backgroundColor: '#3b34f6'
                        }
                    ];
    zones_chart_data.datasets = datasets;
    zones_chart_data.labels = data.zones;
    zones_chart_data.title = "Zone Availability";
    zones_chart_data.y_title = "Hours (hrs)";
    zones_chart_data.x_title = "Zones";
    return (
      <div className="dashboard-container" data-name="dashboard">
          <Sidebar 
          collapsed={sidebarCollapsed}
          onToggleCollapse={this.toggleSidebar}
          side_bar_width={this.state.side_bar_width}
          overflow={this.state.overflow}
          />

          <div style={{marginLeft: this.state.side_bar_width}} className="w-full grid grid-cols-1  m-20" data-name="charts-grid">
            <AvailabilityChart data={zones_chart_data} />
          </div>
          <Routes>
            {/* <Route path="/availability/:zoneId" element={<AvailabilityChart data={data} />} /> */}
            <Route path="/availability/:zoneId/*" element={<Availability data={data} />} />
          </Routes>
        </div>
    );
  }
}

export default withRouter(Availability_Details);
