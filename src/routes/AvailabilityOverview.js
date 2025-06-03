import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter';
// import { Outlet } from 'react-router-dom';
import AvailabilityChart from '../components/Charts/AvailabilityChart';
import { ZoneSidebar } from '../components/Sidebar/ZoneSidebar';
import { PowerDataTable } from '../components/Tables/PowerTable_Zones';
import data from '../utils/data';

let feeder_ids = [728, 807, 736, 751, 772, 765, 806, 813, 815, 733, 808, 727, 739, 773, 743, 826, 816, 774, 770, 752, 754, 747, 748, 794];
let trading_point_to_feederId = {
  "GRA/PALACE" : [{name: "GRA/PALACE", feederId: 765, zone: "Bauchi"}], 
  "GUBI" : [{name: "GUBI DAM", feederId: 770, zone: "Bauchi"}, {name: "TEACHING HOSPITAL", feederId: 773, zone: "Bauchi"}, {name: "WUNTI ROAD", feederId:	774, zone: "Bauchi"}],
  "ASHAKA" : [{name: "ASHAKA", feederId: 747, zone: "Gombe"}], 
  "SHONGO": [{name: "GOVT. HOUSE GOMBE", feederId: 751, zone: "Gombe"}, {name: "TUNFURE", feederId: 743, zone: "Gombe"}], 
  "FMC" : [{name: "FMC", feederId: 736, zone: "Gombe"}], 
  "GOMBE TOWN" : [{name: "GRA GOMBE", feederId: 772, zone: "Gombe"}],
  "MAKERI" : [{name: "COCA COLA", feederId:	807, zone: "Makari Jos"}, {name: "NASCO", feederId: 808, zone: "Makari Jos"}, {name: "INDUSTRIAL JOS", feederId:	806, zone: "Makari Jos"}, {name: "MAKERI", feederId: 733, zone: "Makari Jos"}], 
  "NEW GOVT. HOUSE JOS" : [{name: "NEW GOVT. HOUSE JOS", feederId: 727, zone: "Makari Jos"}], 
  "SECRETARIAT" : [{name: "IBRAHIM TAIWO", feederId: 813, zone: "Makari Jos"}, {name: "LIBERTY DAM", feederId: 815, zone: "Makari Jos"}, {name: "SECRETARIAT", feederId: 739, zone: "Makari Jos"}], 
  "BUKURU" : [{name: "BUKURU", feederId: 728, zone: "Makari Jos"}],
  "ANGLO JOS" : [{name: "WEST OF MINES", feederId: 816, zone: "Zaria Road Jos"}], 
  "DOGON DUTSE" : [{name: "UNIJOS", feederId: 826, zone: "Zaria Road Jos"}],
  "BCC I" : [{name: "BCC I", feederId:	752, zone: "Yandev Gboko"}], 
  "BCC II" : [{name: "BCC II", feederId: 754, zone: "Yandev Gboko"}]
}

class Availability_Overview extends Component {
  constructor(props) {
    super(props);
    this.showComponent = this.showComponent.bind(this);
    this.fetchAvailability = this.fetchAvailability.bind(this);
    this.state = {
      sidebarVisible: window.innerWidth >= 768,
      data: null,
      complete_data: null,
      isLoading: true,
      isFirstLoading: true,
      error: null,
      sidebarCollapsed: window.innerWidth >= 768 ? false : true,
      viewMode: "daily", // hourly, daily, weekly
      side_bar_width: window.innerWidth >= 768 ? "250px" : "60px",
      overflow: "overflow-scroll",
      selectedZone: null,
      showTable: true,
      showText: "Show Chart",
      showChart: false
    };
  }

  componentDidMount() {
    this.fetchAvailability();
    this.intervalId = setInterval(() => {
      this.fetchAvailability();
    }, 300000);    
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  handleZoneChange = (zone) => {
    this.setState({ selectedZone: zone });
  };
  async fetchAvailability() {
    try {
      this.setState({ isLoading: true });
      console.log(" I am activated again")
      const complete_data = [];
      const url = `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-online-data?apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`;
      fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(res => res.json())
      .then( response => {
        const { data } = response;
        if(data?.length > 0) {
          const filtered_data = data.filter( data => {
            return feeder_ids.includes(data.feederId);
          });
          // Build an Array of Objects from the returned data with needed keys
          // Iterate over trading_point_to_feederId to get the feederId in order to get the proper
          // trading_point and zone
          const trading_point_to_feederId_keys = Object.keys(trading_point_to_feederId);
          // Iterate over the trading point keys to filter each feeder's Id from the filtered data  
          trading_point_to_feederId_keys.forEach( tp_keys => {
            // Get the array containing objects of feeders under this particular trading point
            const tp_feeders_array = trading_point_to_feederId[tp_keys];
            // Iterate over the trading point feeders array to perform operations on each feeders
            tp_feeders_array.forEach(tp_feeder => {
              // feederId = tp_feeder.feederId == use this to filter for data from the backend
              // Filter the data for this particular trading point feeder with its feederId matched to the
              // filtered data from the backend
              const feeder_data = filtered_data.filter( f_data => f_data.feederId == tp_feeder.feederId);
              // Create a temporary object that will hold the computed data for this particular feeder
              // and push the data to complete_data array which will then be used to set state
              const temp_object = {};
              const temp_feeder_zone = tp_feeder.zone;
              temp_object.zone = temp_feeder_zone;
              temp_object.trading_point = tp_keys;
              temp_object.name = feeder_data[0].name;
              temp_object.date = new Date().toLocaleDateString();
              temp_object.time = new Date().getHours() + ":" + new Date().getMinutes();
              temp_object.megawatts = feeder_data[0].power;
              temp_object.voltage = feeder_data[0].voltage1;
              temp_object.amperes = feeder_data[0].current1;
              temp_object.feederStatus = Number(feeder_data[0].status) == 1 ? "ON" : "OFF";
              temp_object.uptime = feeder_data[0].upTimeHours;              
              complete_data.push(temp_object);              
            });
          })          
        }
        this.setState({complete_data});
        this.setState({ error: null });
      })
      .catch(err => {
        this.setState({ error: err });
        this.reportError(err);
      })
      .finally(() => {
        this.setState({ isLoading: false });
        this.setState({ isFirstLoading: false });
      });
    } catch (err) {
      this.setState({ error: err });
      this.reportError(err);
    } finally {
      // this.setState({ isLoading: false });
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
    const { isLoading, error, showText, complete_data, isFirstLoading } = this.state;
    const { selectedZone } = this.state;
    const uniqueZones = ["All", ...new Set(complete_data?.map((d) => d.zone))];
    // const { sidebarCollapsed, viewMode, sidebarVisible, } = this.state;
    const complete_chart_data = {}
    uniqueZones.forEach(zone => {
      if(zone !== 'All') complete_chart_data[zone] = complete_data?.filter( data => data.zone == zone);
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
    if (!complete_data) return null;
  
    return (
      <div  className="dashboard-container" data-name="dashboard">
          <div style={{marginLeft: this.props.side_bar_width}} className="flex h-screen">
            <div style={{zIndex: 1}} className="flex-2 p-5 bg-white overflow-auto">
              <ZoneSidebar
                zones={uniqueZones}
                selectedZone={selectedZone}
                onZoneChange={this.handleZoneChange}
              />
              <span>
                <button onClick={this.showComponent} className=" text-sm bg-gray-500 mt-2 p-2 border-4 rounded-md font-medium ">
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
            </div>          
            {this.state.showTable && (<div className="flex-1 p-5 bg-white overflow-auto">
                <h1 className="text-2xl font-bold mb-4">
                  Power Monitoring Dashboard {selectedZone ? `- ${selectedZone}` : ""}
                </h1>
                <PowerDataTable data={complete_data} selectedZone={selectedZone} />
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
