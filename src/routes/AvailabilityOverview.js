import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter';
// import { Outlet } from 'react-router-dom';
import AvailabilityChart from '../components/Charts/AvailabilityChart';
import { ZoneSidebar } from '../components/Sidebar/ZoneSidebar';
import { PowerDataTable } from '../components/Tables/PowerTable_Zones';
import data from '../utils/data';



class Availability_Overview extends Component {
  constructor(props) {
    super(props);
    this.showComponent = this.showComponent.bind(this);
    this.handleStorageChange = this.handleStorageChange.bind(this);
    this.state = {
      sidebarVisible: window.innerWidth >= 768,
      data: null,
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
      complete_data: null,
      error: null,
      complete_data_localstorage: JSON.parse(localStorage.getItem("complete_data")) || null,
      dashboardCompute_props: this.props.dashboardCompute,
      dashboardCompute: JSON.parse(localStorage.getItem("dashboardCompute")) || null,
    };
    this.intervalId = null;
  }

  componentDidMount() {
    window.addEventListener("complete_data", this.handleStorageChange);
    window.addEventListener("dashboardCompute", this.handleDashboardCompute);
    // this.fetchAvailability();
    // this.intervalId = setInterval(() => {
    //   this.fetchAvailability();
    // }, 300000);
    // const { isLoading, error, complete_data, isFirstLoading } = this.props;
    // this.isLoading = isLoading;
    // this.error = error;
    // this.complete_data = complete_data;
    // this.isFirstLoading = isFirstLoading;
    
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
    window.removeEventListener("complete_data", this.handleStorageChange);
    window.removeEventListener("dashboardCompute", this.handleDashboardCompute);
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.props.isFirstLoading !== this.state.isFirstLoading || this.props.isLoading !== this.state.isLoading
      || this.props.error !== this.state.error || this.props.complete_data !== this.state.complete_data
    ) {
      const { isLoading, error, complete_data, isFirstLoading } = this.props;
      this.setState({
        isLoading, error, complete_data, isFirstLoading
      });
      // console.log(this.state.complete_data_localstorage, "  this is the complete_data_localstorage inside component did update");
    }
    if(prevProps.dashboardCompute !== this.props.dashboardCompute) {
        this.setState({dashboardCompute_props: this.props.dashboardCompute});
    }
  }
  handleDashboardCompute = () => {
        this.setState({
            dashboardCompute: JSON.parse(localStorage.getItem("dashboardCompute")) || {}
        });
    };
  handleStorageChange() {
    this.setState({
            complete_data_localstorage: JSON.parse(localStorage.getItem("complete_data")) || {}
        });
  }
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
    // console.log(this.complete_data, this.isFirstLoading, this.isLoading, this.error)
    const { isLoading, error, complete_data, complete_data_localstorage, dashboardCompute, dashboardCompute_props } = this.state;
    // console.log(complete_data_localstorage, "  this is the complete_data_localstorage");
    const isFirstLoading = (!complete_data && !complete_data_localstorage);
    const chosenData = complete_data || complete_data_localstorage;
    const chosenDashboardCompute = dashboardCompute || dashboardCompute_props;
    const { showText } = this.state;
    const { selectedZone } = this.state;
    const uniqueZones = ["All", ...new Set(chosenData?.map((d) => d.zone))];
    // const { sidebarCollapsed, viewMode, sidebarVisible, } = this.state;
    const complete_chart_data = {}
    uniqueZones.forEach(zone => {
      if(zone !== 'All') complete_chart_data[zone] = chosenData?.filter( data => data.zone == zone);
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
    // if (error) {
    //    (
    //     <div style={{width: "50%", margin: "0 auto"}} className="flex justify-center items-center h-screen text-red-500" data-name="error">
    //       <div className="text-center">
    //         <i className="fas fa-exclamation-triangle fa-3x mb-4"></i>
    //         <p>Error loading dashboard data</p>
    //       </div>
    //     </div>
    //   );
    // }
    if (!chosenData) return null;
  
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
                {Number(chosenDashboardCompute.totalMW).toFixed(2)} MW
                </div>
            </div>
           
            {this.state.showTable && (<div className="flex-1 p-5 bg-white overflow-scroll">
                <h1 className="text-2xl font-bold mb-4">
                  Power Monitoring Dashboard {selectedZone ? `- ${selectedZone}` : ""}
                </h1>
                <PowerDataTable data={chosenData} selectedZone={selectedZone} />
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
