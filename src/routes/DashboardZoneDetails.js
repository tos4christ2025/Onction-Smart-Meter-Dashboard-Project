import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter';

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

class DashboardZoneDetails extends Component {
  constructor(props) {
    super(props);
    this.handleStorageChange = this.handleStorageChange.bind(this);
    this.state = {
      isLoading: true,
      error: null,
      selectedZone: "Zone A",
      sidebarCollapsed: window.innerWidth >= 768 ? false : true,
      showUsageChart: true,
      showAlerts: true,
      showEnergyFlow: true,
      viewMode: "daily", // hourly, daily, weekly
      side_bar_width: this.props.side_bar_width,
      overflow: "overflow-scroll",
      zones_data: JSON.parse(localStorage.getItem('app_zone_data')) || [],
      props_zones_data: this.props.zones_data || [],
      complete_data_props: this.props.complete_data || null,
      complete_data_localstorage: JSON.parse(localStorage.getItem("complete_data")) || null,
    };
  }

  componentDidMount() {
        window.addEventListener("app_zone_data", this.handleStorageChange);
    }
    componentWillUnmount() {
        window.removeEventListener("app_zone_data", this.handleStorageChange);
    }
    componentDidUpdate(prevProps, prevState) {
        // if(this.props.side_bar_width !== this.state.side_bar_width) {
        //     this.setState({
        //         side_bar_width: this.props.side_bar_width
        //     });
        // }
    }
   handleStorageChange = () => {
        this.setState({
            zones_data: JSON.parse(localStorage.getItem("app_zone_data")) || {}
        });
    };
    handleCompleteDataChange = () => {
        this.setState({
            zones_data: JSON.parse(localStorage.getItem("app_zone_data")) || {}
        });
    };

  reportError(err) {
    console.error('Dashboard error:', err);
  }

  render() {
    const zoneId = this.props.params.zoneId;
    const {complete_data_localstorage, complete_data_props} = this.state;
    const {zones_data, props_zones_data} = this.state;
    const chosenData = zones_data || props_zones_data;
    const chosenCompleteData = complete_data_localstorage || complete_data_props;
    // console.log("chosenData", chosenData);
    const zone = chosenData.filter(zone => {
        const zoneNameLower = zone.name.toLowerCase();
        // console.log("Zone Name Lower", zoneNameLower);
        // console.log("Zone ID", zoneId);
        return zoneNameLower === zoneId;
    });
    const zone_energy = chosenCompleteData?.filter(data => zoneId == data.zone.toLowerCase());
    console.log(zone_energy, ' the energy of zones')
    // console.log(zone, ' the zone')
    const name_mapping = {
        'GRA_PALACE': 'GRA/PALACE',
        'GUBI DAM': 'GUBI 33KV',
        'TEACHING_HOSPITAL': 'TEACHING HOSPITAL',
        'WUNTI_ROAD': 'WUNTI ROAD',
        'ASHAKA': 'ASHAKA I',
        FMC: 'FMC',
        'GOVT_HOUSE_GOMBE': 'GOVT. HOUSE GOMBE',
        TUNFURE: 'TUNFURE',
        'GRA_GOMBE': 'GRA GOMBE',
        'COCACOLA': 'COCA COLA',
        NASCO: 'NASCO',
        'INDUSTRIAL_JOS': 'INDUSTRIAL JOS',
        MAKERI: 'MAKERI',
        'NEW_GOVT_HOUSE_JOS': 'NEW GOVT. HOUSE JOS',
        IBRAHIM_TAIWO: 'IBRAHIM TAIWO',
        LIBERTY_DAM: 'LIBERTY DAM',
        SECRETARIAT: 'SECRETARIAT',
        'WEST_OF_MINES': 'WEST OF MINES',
        BUKURU: 'BUKURU',
        UNIJOS: 'UNIJOS',
        'BCC1': 'DCP1',
        'BCC2': 'DCP2',
    }
    // console.log("Zone", zone);
    const { isLoading, error } = this.state;
    if(!zone || zone.length === 0) {
      console.error("No zones found for the given zoneId:", zoneId);
        return (
            <div style={{width: "50%", margin: "0 auto"}} className="flex justify-center items-center h-screen text-red-500" data-name="error">
            <div className="text-center">
            <i className="fas fa-exclamation-triangle fa-3x mb-4"></i>
            <p>No data available for the selected zone.</p>
            </div>
            </div>
        )
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

    try {
        return (
            <div style={{padding: "50px"}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-name="zone-overview">
                <button
                        onClick={() => this.props.navigate('/dashboard')}
                        className="mb-4 text-sm bg-gray-300 px-2 py-1 rounded"
                        style={{ position: "fixed", top: 6, left: 264 }}
                    >
                        Back to Dashboard
                    </button>
                

                {zone[0].data.map((zone, index) => {
                const name = Object.keys(zone)[0];
                const zoneData = zone[name];
                const zoneEnergy = zone_energy.filter(ze => ze.name == name_mapping[name]);
                // console.log("zoneEnergy ", zoneEnergy);
                // console.log("Zone name", name); actualEnergyConsumption
                // return null;
                return (
                    <div key={index} className="card m-0 p-1 flex flex-col justify-between relative w-full max-w-sm" data-name="zone-card">
                        <div className="flex justify-between items-center mb-2 flex-wrap" data-name="zone-header">
                            <h3 className="text-lg font-semibold" data-name="zone-title">{name? name : ''}</h3>
                            <span className={`px-2 py-1 rounded-full text-sm ${
                                zoneData?.status == 1 ? 'bg-green-100 text-green-800' : 
                                zoneData?.status == 0 ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                            }`} data-name="zone-status">
                                {zoneData?.status === 1 ? 'Online' : 'Offline'}
                            </span>
                        </div>
                        <div className="space-y-1" data-name="zone-metrics">
                            <div className="flex justify-between" data-name="current-usage">
                                <span className="text-gray-600">Current Usage:</span>
                                <span className="font-medium">{((zoneEnergy[0]?.actualEnergyConsumption)/1000).toFixed(2)} MWh</span>
                            </div>
                            <div className="flex justify-between" data-name="daily-average">
                                <span className="text-gray-600">Daily Average:</span>
                                <span className="font-medium">{(zoneData?.averagePower/1000).toFixed(2)} MWh</span>
                            </div>
                            <div className="flex justify-between" data-name="peak-demand">
                                <span className="text-gray-600">Peak Demand:</span>
                                <span className="font-medium">{(zoneData?.averagePower/1000).toFixed(2)} MW</span>
                            </div>
                        </div>
                        
                    </div>
                 )})}
                
            </div>
        );
        } catch (error) {
            console.error('ZoneOverview component error:', error);
            reportError(error);
            return null;
        }
  }
}

export default withRouter(DashboardZoneDetails);
