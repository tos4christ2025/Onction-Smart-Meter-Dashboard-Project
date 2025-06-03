import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter';
import Sidebar from '../components/Sidebar/Sidebar';
import EnergyUsageChart from '../components/Charts/EnergyUsageChart';
import ZoneComparisonChart from '../components/Charts/ZoneComparisonChart_Class';
import EnergyFlowDiagram from '../components/Charts/EnergyFlowDiagram';
// import AlertPanel from '../components/Dashboard/AlertPanel';
import ZoneOverview from '../components/Dashboard/ZoneOverview';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { getMockData } from '../utils/dataUtils';
import axios from 'axios';

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
const urls = {
 url_bukuru : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=BUKURU&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_graPalace : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=GRA/PALACE&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_gubiDam : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=GUBI DAM&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_teachingHospital : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=TEACHING HOSPITAL&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_wuntiRoad : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=WUNTI ROAD&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_ashaka : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=ASHAKA&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_GH_Gombe : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=GOVT. HOUSE GOMBE&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_tunfure : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=TUNFURE&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_fmc : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=FMC&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_graGombe : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=GRA GOMBE&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_cocacola : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=COCA COLA&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_nasco : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=NASCO&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_industrialJos : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=INDUSTRIAL JOS&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_makeri : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=MAKERI&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_GH_Jos : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=NEW GOVT. HOUSE JOS&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_ibrahimTaiwo : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=IBRAHIM TAIWO&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_libertyDam : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=LIBERTY DAM&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_secretariat : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=SECRETARIAT&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_westOfMines : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=WEST OF MINES&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_unijos : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=UNIJOS&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_bcc1 : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=BCC I&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_bcc2 : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=BCC II&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
};

class DashboardOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GRA_PALACE: {},
      GUBI_DAM: {},
      TEACHING_HOSPITAL: {},
      WUNTI_ROAD: {},
      ASHAKA: {},
      GOVT_HOUSE_GOMBE: {},
      TUNFURE: {},
      FMC: {},
      GRA_GOMBE: {},
      COCACOLA: {},
      NASCO: {},
      INDUSTRIAL_JOS: {},
      MAKERI: {},
      NEW_GOVT_HOUSE_JOS: {},
      IBRAHIM_TAIWO: {},
      LIBERTY_DAM: {},
      SECRETARIAT: {},
      BUKURU: {},
      WEST_OF_MINES: {},
      UNIJOS: {},
      BCC1: {},
      BCC2: {},
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
    this.pollingInterval = null;
    this.maxRetries = 5;
  }

  componentDidMount() {
    this.fetchData();
    this.fetchEnergyData();
    this.pollingInterval = setInterval(() => {
      this.fetchEnergyData();
    },600000)
    // fetch energy data for all the stations at the current moment using the algorithm and update their state
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState !== this.state) {

    }
  }
  componentWillUnmount() {
    clearInterval(this.pollingInterval);
  }

  async fetchEnergyData() {
    this.setState({isLoading: true});
    try {
      // Get the page number for this current hour
      const pageNumber = this.pageNumber();      
      // Fetch multiple feeders in parallel with retries     
      const [GOVT_HOUSE_GOMBE, NEW_GOVT_HOUSE_JOS, 
        ASHAKA, BCC1, BCC2, BUKURU, COCACOLA, FMC, GRA_GOMBE, GRA_PALACE,
        GUBI_DAM, IBRAHIM_TAIWO, INDUSTRIAL_JOS, LIBERTY_DAM, MAKERI, NASCO, SECRETARIAT, TEACHING_HOSPITAL, TUNFURE,
        UNIJOS, WEST_OF_MINES, WUNTI_ROAD
      ] = await Promise.all([
        this.fetchWithRetry(pageNumber, urls.url_GH_Gombe),
        this.fetchWithRetry(pageNumber, urls.url_GH_Jos),
        this.fetchWithRetry(pageNumber, urls.url_ashaka),
        this.fetchWithRetry(pageNumber, urls.url_bcc1),
        this.fetchWithRetry(pageNumber, urls.url_bcc2),
        this.fetchWithRetry(pageNumber, urls.url_bukuru),
        this.fetchWithRetry(pageNumber, urls.url_cocacola),
        this.fetchWithRetry(pageNumber, urls.url_fmc),
        this.fetchWithRetry(pageNumber, urls.url_graGombe),
        this.fetchWithRetry(pageNumber, urls.url_graPalace),
        this.fetchWithRetry(pageNumber, urls.url_gubiDam),
        this.fetchWithRetry(pageNumber, urls.url_ibrahimTaiwo),
        this.fetchWithRetry(pageNumber, urls.url_industrialJos),
        this.fetchWithRetry(pageNumber, urls.url_libertyDam),
        this.fetchWithRetry(pageNumber, urls.url_makeri),
        this.fetchWithRetry(pageNumber, urls.url_nasco),
        this.fetchWithRetry(pageNumber, urls.url_secretariat),
        this.fetchWithRetry(pageNumber, urls.url_teachingHospital),
        this.fetchWithRetry(pageNumber, urls.url_tunfure),
        this.fetchWithRetry(pageNumber, urls.url_unijos),
        this.fetchWithRetry(pageNumber, urls.url_westOfMines),
        this.fetchWithRetry(pageNumber, urls.url_wuntiRoad),
      ]);
      this.setState({
       GOVT_HOUSE_GOMBE, NEW_GOVT_HOUSE_JOS, 
      ASHAKA, BCC1, BCC2, BUKURU, COCACOLA, FMC, GRA_GOMBE, GRA_PALACE,
       GUBI_DAM, IBRAHIM_TAIWO, INDUSTRIAL_JOS, LIBERTY_DAM, MAKERI, NASCO, SECRETARIAT, TEACHING_HOSPITAL,
       TUNFURE, UNIJOS, WEST_OF_MINES, WUNTI_ROAD, 
      isLoading: false
      });
    } catch (err) {
      this.setState({ error: err });
      this.reportError(err);
    } finally {
      // this.setState({ isLoading: false });
    }
  }
  pageNumber() {
    const date_array = new Date().toLocaleTimeString().split(":");
    return ((Number(date_array[0])*6) + Number(date_array[1]) + 1);
  }
  // 
  async fetchWithRetry(pageNumber, url, retries = this.maxRetries, baseDelay = 1000) {
    let attempt = 0;
    const url_to_send = url(pageNumber);
      try {
        // Calculate the page number with the pageNumber function
        const response = await axios.get(url_to_send);
        if (response?.data?.data?.items?.length > 0) {
          return response.data.data.items[response.data.data.items.length -1]; // Success!
        } else if(response?.data?.data?.items?.length == 0) {
          // Get the total pages
          const {totalPages} = response.data.data;
          if(totalPages == 0) {
            return null;
          } else if(totalPages > 0) {
            // Resend query with the new page number
            return this.fetchWithRetry(totalPages, url, retries = this.maxRetries, baseDelay = 1000);
          }          
        }        
      } catch (error) {
        attempt++;
        const delay = baseDelay * 2 ** attempt; // Exponential backoff
        console.warn(
          `Retrying ${url} (attempt ${attempt} of ${retries}) after ${delay}ms`
        );
        await this.sleep(delay);
        this.setState({ error });
        this.reportError(error);
      }
  }
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
    const { selectedZone, sidebarCollapsed, showUsageChart, showAlerts, showEnergyFlow, viewMode } = this.state;
    const {GRA_GOMBE, GRA_PALACE, BCC1, BCC2, BUKURU, ASHAKA, COCACOLA, GUBI_DAM, TEACHING_HOSPITAL, SECRETARIAT,
            LIBERTY_DAM, UNIJOS, WEST_OF_MINES, GOVT_HOUSE_GOMBE, NEW_GOVT_HOUSE_JOS, FMC, TUNFURE, WUNTI_ROAD, NASCO,
            INDUSTRIAL_JOS, MAKERI, IBRAHIM_TAIWO
          } = this.state;

    const Gombe_Energy = (isNaN(FMC?.activeEnergyTotal) ? 0 : FMC?.activeEnergyTotal) + (isNaN(GRA_GOMBE?.activeEnergyTotal) ? 0 : GRA_GOMBE?.activeEnergyTotal) + 
        (isNaN(TUNFURE?.activeEnergyTotal) ? 0 : TUNFURE?.activeEnergyTotal) + (isNaN(ASHAKA?.activeEnergyTotal) ? 0 : ASHAKA?.activeEnergyTotal) + 
        (isNaN(GOVT_HOUSE_GOMBE?.activeEnergyTotal) ? 0 : GOVT_HOUSE_GOMBE?.activeEnergyTotal);

    const Bauchi_Energy = (isNaN(GRA_PALACE?.activeEnergyTotal) ? 0 : GRA_PALACE?.activeEnergyTotal) + (isNaN(WUNTI_ROAD?.activeEnergyTotal) ? 0 : WUNTI_ROAD?.activeEnergyTotal) + 
      (isNaN(GUBI_DAM?.activeEnergyTotal) ? 0 : GUBI_DAM?.activeEnergyTotal) + (isNaN(TEACHING_HOSPITAL?.activeEnergyTotal) ? 0 : TEACHING_HOSPITAL?.activeEnergyTotal);

    const Makari_Jos_Energy = (isNaN(NASCO?.activeEnergyTotal) ? 0 : NASCO?.activeEnergyTotal) + (isNaN(MAKERI?.activeEnergyTotal) ? 0 : MAKERI?.activeEnergyTotal) + 
      (isNaN(COCACOLA?.activeEnergyTotal) ? 0 : COCACOLA?.activeEnergyTotal) + (isNaN(SECRETARIAT?.activeEnergyTotal) ? 0 : SECRETARIAT?.activeEnergyTotal) + 
      (isNaN(BUKURU?.activeEnergyTotal) ? 0 : BUKURU?.activeEnergyTotal) + (isNaN(LIBERTY_DAM?.activeEnergyTotal) ? 0 : LIBERTY_DAM?.activeEnergyTotal) + 
      (isNaN(IBRAHIM_TAIWO?.activeEnergyTotal) ? 0 : IBRAHIM_TAIWO?.activeEnergyTotal) + (isNaN(INDUSTRIAL_JOS?.activeEnergyTotal) ? 0 : INDUSTRIAL_JOS?.activeEnergyTotal) + 
      (isNaN(NEW_GOVT_HOUSE_JOS?.activeEnergyTotal) ? 0 : NEW_GOVT_HOUSE_JOS?.activeEnergyTotal);

    const Yandev_Gboko_Energy = (isNaN(BCC1?.activeEnergyTotal) ? 0 : BCC1?.activeEnergyTotal) + (isNaN(BCC2?.activeEnergyTotal) ? 0 : BCC2?.activeEnergyTotal);

    const Zaria_Jos_Energy = (isNaN(UNIJOS?.activeEnergyTotal) ? 0 : UNIJOS?.activeEnergyTotal) + (isNaN(WEST_OF_MINES?.activeEnergyTotal) ? 0 : WEST_OF_MINES?.activeEnergyTotal);

    const zones_data = [
      {name: "Bauchi", status: 'normal', currentUsage: (Bauchi_Energy/1000).toFixed(2), dailyAverage: ((Bauchi_Energy/(Number(new Date().getHours())+1))/1000).toFixed(2), peakDemand: (Bauchi_Energy/1000).toFixed(2)},
      {name: "Gombe", status: 'normal', currentUsage: (Gombe_Energy/1000).toFixed(2), dailyAverage: ((Gombe_Energy/(Number(new Date().getHours())+1))/1000).toFixed(2), peakDemand: (Gombe_Energy/1000).toFixed(2)},
      {name: "Makari_Jos", status: 'normal', currentUsage: (Makari_Jos_Energy/1000).toFixed(2), dailyAverage: ((Makari_Jos_Energy/(Number(new Date().getHours())+1))/1000).toFixed(2), peakDemand: (Makari_Jos_Energy/1000).toFixed(2)},
      {name: "Zaria_Jos", status: 'normal', currentUsage: (Zaria_Jos_Energy/1000).toFixed(2), dailyAverage: ((Zaria_Jos_Energy/(Number(new Date().getHours())+1))/1000).toFixed(2), peakDemand: (Zaria_Jos_Energy/1000).toFixed(2)},
      {name: "Yandev_Gboko", status: 'normal', currentUsage: (Yandev_Gboko_Energy/1000).toFixed(2), dailyAverage: ((Yandev_Gboko_Energy/(Number(new Date().getHours())+1))/1000).toFixed(2), peakDemand: (Yandev_Gboko_Energy/1000).toFixed(2)},
    ]
    // if (isLoading) {
    //   return (
    //     <div style={{width: "50%", margin: "0 auto"}} className="flex justify-center items-center h-screen" data-name="loading">
    //       <i className="fas fa-spinner fa-spin fa-3x text-blue-500"></i>
    //     </div>
    //   );
    // }

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

    if (!data) return null;

    return (
        <div style={{marginLeft: this.props.side_bar_width}} className="main-content grid grid-cols-1 overflow-auto" data-name="main-content">    
          <DashboardHeader 
            totalUsage={data.totalUsage}
            savings={data.savings}
          />

          {/* <ZoneOverview zones={data.zones} /> */}
            <ZoneOverview zones={zones_data} />

          { (isLoading) & (
              <div style={{width: "50%", margin: "0 auto", display: 'relative'}} className="flex justify-center items-center h-screen" data-name="loading">
                <i className="fas fa-spinner fa-spin fa-3x text-blue-500"></i>
              </div>
            )
          }

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6" data-name="charts-grid">
            <EnergyUsageChart data={data.energyUsage} />
            <ZoneComparisonChart data={data.zoneComparison} />
          </div>

          <EnergyFlowDiagram data={data.energyFlow} />
        </div>
    );
  }
}

export default withRouter(DashboardOverview);
