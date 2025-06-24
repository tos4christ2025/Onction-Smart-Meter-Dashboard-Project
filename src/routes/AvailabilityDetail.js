import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter';
import AvailabilityChart from '../components/Charts/AvailabilityChart';
import { getMockData } from '../utils/dataUtils';

class Availability extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      const mockData = getMockData().availability.zones_data;
      this.setState({ data: mockData });
    } catch (err) {
      this.setState({ error: err });
      this.reportError(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }
  

  handleViewModeChange = (mode) => {
    this.setState({ viewMode: mode });
  };

  reportError(err) {
    console.error('Dashboard error:', err);
  }

//   navigateToZone = (link) => {
//     this.props.navigate(link);
//   }

  render() {
    const { data, isLoading, error } = this.state;
    let { zoneId } = this.props.params;
    zoneId = zoneId.replace(/-/g, " ");
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
    const zones_chart_data = {};
    const feederArray = data.filter(name => name.name.toLowerCase() === zoneId.toLowerCase());
    zones_chart_data.labels = feederArray[0].feeders.name;
    const datasets = [];
    datasets.push({
        label: 'uptime',
        data: feederArray[0].feeders.uptime,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
    });
    datasets.push({
        label: 'downtime',
        data: feederArray[0].feeders.downtime,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
    });
    zones_chart_data.datasets = datasets;
    zones_chart_data.title = zoneId + ' Feeders Availability';
    zones_chart_data.y_title = 'Hour (hrs)';
    zones_chart_data.x_title = 'Feeders';
   
    return (
      <div className="dashboard-container" data-name="dashboard">
          <div style={{marginLeft: this.state.side_bar_width}} className="w-full grid grid-cols-1  m-20" data-name="charts-grid">
            <AvailabilityChart data={zones_chart_data} />
          </div>
        </div>
    );
  }
}

export default withRouter(Availability);
