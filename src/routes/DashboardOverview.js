import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter';
import EnergyUsageChart from '../components/Charts/EnergyUsageChart';
import ZoneComparisonChart from '../components/Charts/ZoneComparisonChart_Class';
import EnergyFlowDiagram from '../components/Charts/EnergyFlowDiagram';
import ZoneOverview from '../components/Dashboard/ZoneOverview';
import DashboardHeader from '../components/Dashboard/DashboardHeader';



class DashboardOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard_data: JSON.parse(localStorage.getItem("dashboard_data")) || null,
      dashboard_data_props: this.props.dashboard_data || null,
      dashboardCompute_props: this.props.dashboardCompute,
      dashboardCompute: JSON.parse(localStorage.getItem("dashboardCompute")) || null,
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
    console.log("mounted");
     window.addEventListener("dashboard_data", this.handleStorageChange);
     window.addEventListener("dashboardCompute", this.handleDashboardCompute);
    // fetch energy data for all the stations at the current moment using the algorithm and update their state
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.dashboard_data !== this.props.dashboard_data) {
        this.setState({dashboard_data_props: this.props.dashboard_data});
    }
    if(prevProps.dashboardCompute !== this.props.dashboardCompute) {
        this.setState({dashboardCompute_props: this.props.dashboardCompute});
    }
  }
  componentWillUnmount() {
    console.log("unmounted");
   window.removeEventListener("complete_data", this.handleStorageChange);
   window.removeEventListener("dashboardCompute", this.handleDashboardCompute);
  }
  handleStorageChange = () => {
        this.setState({
            dashboard_data: JSON.parse(localStorage.getItem("dashboard_data")) || {}
        });
    };
    handleDashboardCompute = () => {
        this.setState({
            dashboardCompute: JSON.parse(localStorage.getItem("dashboardCompute")) || {}
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
    const { dashboard_data_props, isLoading, error, dashboard_data, dashboardCompute, dashboardCompute_props } = this.state;
    const isFirstLoading = !dashboard_data && !dashboard_data_props;
    
    const chosenData = dashboard_data || dashboard_data_props;
    const chosenDashboardCompute = dashboardCompute || dashboardCompute_props;

    const { energy_for_zone } = chosenDashboardCompute || {};
    console.log(energy_for_zone, "  energy_for_zone from dashboard overview");
    //  Create the data for EnergyFlow Diagram
    const energyFlow = {
            nodes: ['Main Grid', 'Bauchi', 'Gombe', 'Makari Jos', 'Zaria Road Jos', 'Yandev Gboko', 'Storage'],
            links: [
                { source: 0, target: 1, value: (energy_for_zone['Bauchi']/1000) },
                { source: 0, target: 2, value: (energy_for_zone['Gombe']/1000) },
                { source: 0, target: 3, value: (energy_for_zone['Makari Jos']/1000) },
                { source: 0, target: 4, value: (energy_for_zone['Zaria Road jos']/1000) },
                { source: 0, target: 5, value: (energy_for_zone['Yandev Gboko']/1000) },
                { source: 0, target: 6, value: 5 }
            ]
        }

    // console.log(chosenDashboardCompute, "  chosenDashboardCompute");
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

    if (!chosenData) return null;

    return (
        <div className="main-content grid grid-cols-1 overflow-auto" data-name="main-content">    
          <DashboardHeader 
            totalUsage={chosenData.data.totalUsage}
            savings={chosenData.data.savings}
            dashboardCompute={chosenDashboardCompute}
          />

          {/* <ZoneOverview zones={data.zones} /> */}
            <ZoneOverview zones={chosenData.zones_data} dashboardCompute={chosenDashboardCompute} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6" data-name="charts-grid">
            <EnergyUsageChart data={chosenData.data.energyUsage} />
            <ZoneComparisonChart data={chosenData.data.zoneComparison} />
          </div>

          <EnergyFlowDiagram data={energyFlow} />
        </div>
    );
  }
}

export default withRouter(DashboardOverview);
