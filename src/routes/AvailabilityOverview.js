import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter';
import { Outlet } from 'react-router-dom';
import AvailabilityChart from '../components/Charts/AvailabilityChart';
import { getMockData } from '../utils/dataUtils';
import { ZoneSidebar } from '../components/Sidebar/ZoneSidebar';
import { PowerDataTable } from '../components/Tables/PowerTable_Zones';

const feeder_ids = [728, 807, 736, 751, 772, 765, 806, 813, 815, 733, 808, 727, 739, 773, 743, 826, 816, 774, 770, 752, 754, 747, 748, 794];


class Availability_Details extends Component {
  constructor(props) {
    super(props);
    this.showComponent = this.showComponent.bind(this);
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
      selectedZone: null,
      showTable: false,
      showText: "Show Table",
      showChart: true
    };
  }

  componentDidMount() {
    this.fetchAvailability();
  }

  handleZoneChange = (zone) => {
    this.setState({ selectedZone: zone });
  };

  async fetchAvailability() {
    try {
      this.setState({ isLoading: true });
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
            return feeder_ids.includes(data.id);
          });
          console.log(filtered_data, "  the filtered data");
        }        
      });
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
  showComponent() {
    const {showChart, showTable, showText} = this.state;
    if(showChart) {
      this.setState({showChart: false, showTable: true, showText: "Show Chart"});
    } else if(showTable) {
      this.setState({showChart: true, showTable: false, showText: "Show Table"});
    }
  }

  render() {
    const { data, isLoading, error, showText } = this.state;
    const current_zones = ["Bauchi", "Gombe", "Makari Jos", "Zaria Road Jos", " Yandev Gboko"];
    const Zones = [
      {zone: "Bauchi", trading_point: "GRA/PALACE", name: "GRA/PALACE", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "ON", uptime: 12}, 
      {zone: "Bauchi", trading_point: "GUBI", name: "GUBI DAM", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "ON", uptime: 12}, 
      {zone: "Bauchi", trading_point: "GUBI", name: "TEACHING HOSPITAL", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "ON", uptime: 12}, 
      {zone: "Bauchi", trading_point: "GUBI", name: "WUNTI ROAD", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "ON", uptime: 12}, 
      {zone: "Gombe", trading_point: "ASHAKA", name: "ASHAKA", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "OFF", uptime: 12}, 
      {zone: "Gombe", trading_point: "SHONGO", name: "GOVT. HOUSE GOMBE", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "OFF", uptime: 12}, 
      {zone: "Gombe", trading_point: "SHONGO", name: "TUNFURE", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "OFF", uptime: 12}, 
      {zone: "Gombe", trading_point: "FMC", name: "FMC", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "OFF", uptime: 12}, 
      {zone: "Gombe", trading_point: "GOMBE TOWN", name: "GRA GOMBE", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "OFF", uptime: 12}, 
      {zone: "Makari Jos",  trading_point: "MAKERI", name: "COCA COLA", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "ON", uptime: 12}, 
      {zone: "Makari Jos",  trading_point: "MAKERI", name: "NASCO", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "ON", uptime: 12}, 
      {zone: "Makari Jos",  trading_point: "MAKERI", name: "INDUSTRIAL JOS", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "ON", uptime: 12}, 
      {zone: "Makari Jos",  trading_point: "MAKERI", name: "MAKERI", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "ON", uptime: 12}, 
      {zone: "Makari Jos",  trading_point: "NEW GOVT. HOUSE JOS", name: "GURA TOP/MAZ.", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "ON", uptime: 12}, 
      {zone: "Makari Jos",  trading_point: "NEW GOVT. HOUSE JOS", name: "NEW GOVT. HOUSE JOS", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "ON", uptime: 12}, 
      {zone: "Makari Jos",  trading_point: "NEW GOVT. HOUSE JOS", name: "RAYFIELD", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "ON", uptime: 12}, 
      {zone: "Makari Jos",  trading_point: "SECRETARIAT", name: "IBRAHIM TAIWO", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "ON", uptime: 12}, 
      {zone: "Makari Jos",  trading_point: "SECRETARIAT", name: "LIBERTY DAM", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "ON", uptime: 12}, 
      {zone: "Makari Jos",  trading_point: "SECRETARIAT", name: "SECRETARIAT", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "ON", uptime: 12}, 
      {zone: "Makari Jos",  trading_point: "BUKURU", name: "BUKURU", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "ON", uptime: 12}, 
      {zone: "Makari Jos",  trading_point: "BUKURU", name: "NVRI", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "ON", uptime: 12}, 
      {zone: "Zaria Road Jos", trading_point: "ANGLO JOS", name: "RANTYA", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "OFF", uptime: 12}, 
      {zone: "Zaria Road Jos", trading_point: "ANGLO JOS", name: "STATE LOWCOST", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "OFF", uptime: 12}, 
      {zone: "Zaria Road Jos", trading_point: "ANGLO JOS", name: "TAFAWA BALEWA", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "OFF", uptime: 12}, 
      {zone: "Zaria Road Jos", trading_point: "ANGLO JOS", name: "WEST OF MINES", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "OFF", uptime: 12}, 
      {zone: "Zaria Road Jos", trading_point: "ANGLO JOS", name: "MURTALA MOHAMMED", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "OFF", uptime: 12}, 
      {zone: "Zaria Road Jos", trading_point: "DOGON DUTSE", name: "UNIJOS DEDICATED", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "OFF", uptime: 12}, 
      {zone: "Yandev Gboko", trading_point: "BCC I", name: "BCC I", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "ON", uptime: 12},
      {zone: "Yandev Gboko", trading_point: "BCC II", name: "BCC II", date: "29-05-2025", time: "19:05", megawatts: 2.30, voltage: 11.2, amperes: 219, feederStatus: "ON", uptime: 12}
    ];

    const { selectedZone } = this.state;
    const uniqueZones = ["All", ...new Set(Zones.map((d) => d.zone))];
    const { sidebarCollapsed, viewMode, sidebarVisible, } = this.state;

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
      <div  className="dashboard-container" data-name="dashboard">
          <div style={{marginLeft: this.props.side_bar_width}} className="flex h-screen">
            <div className="flex-2 p-5 bg-gray-50 overflow-auto">
              <ZoneSidebar
                zones={uniqueZones}
                selectedZone={selectedZone}
                onZoneChange={this.handleZoneChange}
              />
              <span>
                <button onClick={this.showComponent} className=" text-sm bg-gray-300 mb-10 p-2 rounded">
                  {showText}
                </button>
              </span>
            </div>
            
            {this.state.showTable && (<div className="flex-1 p-5 bg-gray-50 overflow-auto">
              <h1 className="text-2xl font-bold mb-4">
                Power Monitoring Dashboard {selectedZone ? `- ${selectedZone}` : ""}
              </h1>
              <PowerDataTable data={Zones} selectedZone={selectedZone} />
            </div>)}
          </div>
          {this.state.showChart && (<div className="flex-1 w-full grid grid-cols-1  mt-10 mb-10 mr-2" data-name="charts-grid">
            <AvailabilityChart data={zones_chart_data} />
          </div>)}
      </div>
    );
  }
}

export default withRouter(Availability_Details);
