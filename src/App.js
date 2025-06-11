import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import './tailwind.css';
import './styles/App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../src/styles/sidebar.css';
import '../src/styles/index.css';
import '../src/styles/main.css';
import AlertPanelLayout from './routes/AlertsPanelLayout';
import AlertPanelDetails from './routes/AlertsPanelDetails'
import AppLayout from './routes/AppLayout';
import DashboardLayout from './routes/DashboardLayout';
import DashboardOverview from './routes/DashboardOverview'; 
import AvailabilityLayout from './routes/AvailabilityLayout';
import AvailabilityOverview from './routes/AvailabilityOverview';
import AvailabilityDetail from './routes/AvailabilityDetail';
import DashboardZoneDetails from './routes/DashboardZoneDetails';
import IndexPage from './routes/IndexPage';
import { getMockData } from './utils/dataUtils';
import dataUtils from './utils/dataUtils';
import axios from 'axios';

const urls = {
 url_bukuru : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=BUKURU&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_graPalace : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=GRA/PALACE&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
 url_gubiDam : (pageNumber) => `https://feedercomplianceprodapi.azurewebsites.net/api/v1/Energy/feeder-energy-data?pagenumber=${pageNumber}&feederName=GUBI 33KV&apiKey=${process.env.REACT_APP_POWERTECH_API_KEY}`,
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
library.add(faCoffee, faUser);

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setSideBarWidth = this.setSideBarWidth.bind(this); 
    this.fetchAvailability = this.fetchAvailability.bind(this);
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
      error: null,
      isLoading: true,
      isLoading_dashboard: true,
      error_dashboard: null,
      isFirstLoading: true,
      complete_data: null,
      zones_data: [],
      side_bar_width: window.innerWidth >= 768 ? "250px" : "60px",
      app_zone_data: [],
      dashboard_data: {},
      totalEnergy: null,
      totalUptime: null,
      totalEnergyTime: '',
      dashboardCompute: {},
    };
    this.pollingInterval = null;
    this.maxRetries = 5;
  }
  componentDidMount() {
    console.log(" App Mounted");
    this.fetchData();
    this.fetchEnergyData();
    this.pollingInterval = setInterval(() => {
      this.fetchEnergyData();
    },600000)
    // Fetch Availability at an interval of 5 minutes, after initialization
    this.fetchAvailability();
    this.AvailabilityintervalId = setInterval(() => {
      this.fetchAvailability();
    }, 300000);  
    // Global error handler
    window.onerror = (message, source, lineno, colno, error) => {
      console.error('Global error:', error);
      this.setState({ error });
      reportError(error);
    };
  }
  componentWillUnmount() {
    console.log(" App Unmounted");
    clearInterval(this.AvailabilityintervalId);
     clearInterval(this.pollingInterval);
  }
  componentDidCatch(error, info) {
    this.setState({ error });
    console.error('Error caught in App:', error, info);
    reportError(error);
  }
  setSideBarWidth(width) {
      this.setState({side_bar_width: width});
  }
  //   Dashboard Data fetch Start
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
      const stateObject = {
       GOVT_HOUSE_GOMBE, NEW_GOVT_HOUSE_JOS, 
      ASHAKA, BCC1, BCC2, BUKURU, COCACOLA, FMC, GRA_GOMBE, GRA_PALACE,
       GUBI_DAM, IBRAHIM_TAIWO, INDUSTRIAL_JOS, LIBERTY_DAM, MAKERI, NASCO, SECRETARIAT, TEACHING_HOSPITAL,
       TUNFURE, UNIJOS, WEST_OF_MINES, WUNTI_ROAD, 
      isLoading: false, error: null
      };
      const stateArray = [
        {name: 'bauchi', data: [{"GRA_PALACE": GRA_PALACE || {}}, {"WUNTI_ROAD": WUNTI_ROAD || {}}, {"GUBI_DAM": GUBI_DAM || {}}, {"TEACHING_HOSPITAL": TEACHING_HOSPITAL || {}}]},
        {name: 'gombe', data: [{"FMC": FMC || {}}, {"GRA_GOMBE": GRA_GOMBE || {}}, {"TUNFURE": TUNFURE || {}}, {"ASHAKA": ASHAKA || {}}, {"GOVT_HOUSE_GOMBE": GOVT_HOUSE_GOMBE || {}}]},
        {name: 'makari jos', data: [{"NASCO": NASCO || {}}, {"MAKERI": MAKERI || {}}, {"COCACOLA": COCACOLA || {}}, {"SECRETARIAT": SECRETARIAT || {}}, {"BUKURU": BUKURU || {}}, 
          {"LIBERTY_DAM": LIBERTY_DAM || {}}, {"IBRAHIM_TAIWO": IBRAHIM_TAIWO || {}}, {"INDUSTRIAL_JOS": INDUSTRIAL_JOS || {}}, {"NEW_GOVT_HOUSE_JOS": NEW_GOVT_HOUSE_JOS || {}}]},
        {name: 'zaria road jos', data: [{"UNIJOS": UNIJOS || {}}, {"WEST_OF_MINES": WEST_OF_MINES || {}}]},
        {name: 'yandev gboko', data: [{"BCC1": BCC1 || {}}, {"BCC2": BCC2 || {}}]}
      ];
      // console.log(stateArray, "  the state array");
      // Store this two in the local storage
      this.setState({ ...stateObject, app_zone_data: stateArray });
      localStorage.setItem('app_zone_data', JSON.stringify(stateArray || []));
      window.dispatchEvent(new Event("app_zone_data")); // Notify child component

      // Calculate the totalMW, totalEnergy etc  here
      // calculate Average totalMW from averagePower
    const GRA_PALACE_MW = (isNaN(GRA_PALACE?.averagePower) ? 0 : GRA_PALACE?.averagePower) / 1000;
    const WUNTI_ROAD_MW = (isNaN(WUNTI_ROAD?.averagePower) ? 0 : WUNTI_ROAD?.averagePower) / 1000; 
    const GUBI_DAM_MW = (isNaN(GUBI_DAM?.averagePower) ? 0 : GUBI_DAM?.averagePower) / 1000;
    const TEACHING_HOSPITAL_MW = (isNaN(TEACHING_HOSPITAL?.averagePower) ? 0 : TEACHING_HOSPITAL?.averagePower) / 1000;
    const ASHAKA_MW = (isNaN(ASHAKA?.averagePower) ? 0 : ASHAKA?.averagePower) / 1000;
    const GOVT_HOUSE_GOMBE_MW = (isNaN(GOVT_HOUSE_GOMBE?.averagePower) ? 0 : GOVT_HOUSE_GOMBE?.averagePower) / 1000;
    const TUNFURE_MW = (isNaN(TUNFURE?.averagePower) ? 0 : TUNFURE?.averagePower) / 1000;
    const FMC_MW = (isNaN(FMC?.averagePower) ? 0 : FMC?.averagePower) / 1000;
    const GRA_GOMBE_MW = (isNaN(GRA_GOMBE?.averagePower) ? 0 : GRA_GOMBE?.averagePower) / 1000;
    const COCACOLA_MW = (isNaN(COCACOLA?.averagePower) ? 0 : COCACOLA?.averagePower) / 1000;
    const NASCO_MW = (isNaN(NASCO?.averagePower) ? 0 : NASCO?.averagePower) / 1000;
    const INDUSTRIAL_JOS_MW = (isNaN(INDUSTRIAL_JOS?.averagePower) ? 0 : INDUSTRIAL_JOS?.averagePower) / 1000;
    const MAKERI_MW = (isNaN(MAKERI?.averagePower) ? 0 : MAKERI?.averagePower) / 1000;
    const NEW_GOVT_HOUSE_JOS_MW = (isNaN(NEW_GOVT_HOUSE_JOS?.averagePower) ? 0 : NEW_GOVT_HOUSE_JOS?.averagePower) / 1000;
    const IBRAHIM_TAIWO_MW = (isNaN(IBRAHIM_TAIWO?.averagePower) ? 0 : IBRAHIM_TAIWO?.averagePower) / 1000;
    const LIBERTY_DAM_MW = (isNaN(LIBERTY_DAM?.averagePower) ? 0 : LIBERTY_DAM?.averagePower) / 1000;
    const SECRETARIAT_MW = (isNaN(SECRETARIAT?.averagePower) ? 0 : SECRETARIAT?.averagePower) / 1000;
    const BUKURU_MW = (isNaN(BUKURU?.averagePower) ? 0 : BUKURU?.averagePower) / 1000;
    const WEST_OF_MINES_MW = (isNaN(WEST_OF_MINES?.averagePower) ? 0 : WEST_OF_MINES?.averagePower) / 1000;
    const UNIJOS_MW = (isNaN(UNIJOS?.averagePower) ? 0 : UNIJOS?.averagePower) / 1000;
    const BCC1_MW = (isNaN(BCC1?.averagePower) ? 0 : BCC1?.averagePower) / 1000;
    const BCC2_MW = (isNaN(BCC2?.averagePower) ? 0 : BCC2?.averagePower) / 1000;

    const totalAvgMW = GRA_PALACE_MW + WUNTI_ROAD_MW + GUBI_DAM_MW + TEACHING_HOSPITAL_MW +
      ASHAKA_MW + GOVT_HOUSE_GOMBE_MW + TUNFURE_MW + FMC_MW + GRA_GOMBE_MW +
      COCACOLA_MW + NASCO_MW + INDUSTRIAL_JOS_MW + MAKERI_MW + NEW_GOVT_HOUSE_JOS_MW +
      IBRAHIM_TAIWO_MW + LIBERTY_DAM_MW + SECRETARIAT_MW + BUKURU_MW + WEST_OF_MINES_MW +
      UNIJOS_MW + BCC1_MW + BCC2_MW;

// calculate totalEnergy from activeEnergyTotal
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
    const totalEnergy = (Gombe_Energy + Bauchi_Energy + Makari_Jos_Energy + Zaria_Jos_Energy + Yandev_Gboko_Energy)/1000;

    console.log(GRA_PALACE?.status, WUNTI_ROAD?.status, GUBI_DAM?.status, TEACHING_HOSPITAL?.status)
    // Get the status for each Zones
    const Gombe_status = (FMC?.status && GRA_GOMBE?.status && TUNFURE?.status && ASHAKA?.status && GOVT_HOUSE_GOMBE?.status)  ? 'normal' : 'warning';
    const Bauchi_status = (GRA_PALACE?.status && WUNTI_ROAD?.status && GUBI_DAM?.status && TEACHING_HOSPITAL?.status) ? 'normal' : 'warning';
    const Makari_Jos_status = (NASCO?.status && MAKERI?.status && COCACOLA?.status && SECRETARIAT?.status && BUKURU?.status && LIBERTY_DAM?.status && IBRAHIM_TAIWO?.status && INDUSTRIAL_JOS?.status && NEW_GOVT_HOUSE_JOS?.status) ? 'normal' : 'warning';
    const Zaria_Jos_status = (UNIJOS?.status && WEST_OF_MINES?.status) ? 'normal' : 'warning';
    const Yandev_Gboko_status = (BCC1?.status && BCC2?.status) ? 'normal' : 'warning';
    // Set the status for each Zones
    // console.log("Gombe status: ", Gombe_status);
    // console.log("Bauchi status: ", Bauchi_status);  
    // console.log("Makari Jos status: ", Makari_Jos_status);
    // console.log("Zaria Jos status: ", Zaria_Jos_status);
    // console.log("Yandev Gboko status: ", Yandev_Gboko_status);
    // Get Zones dailyAverage
    const bauchi_avg = (GRA_PALACE_MW + WUNTI_ROAD_MW + GUBI_DAM_MW + TEACHING_HOSPITAL_MW);
    const gombe_avg = FMC_MW + GRA_GOMBE_MW + TUNFURE_MW + ASHAKA_MW + GOVT_HOUSE_GOMBE_MW;
    const makari_jos_avg = NASCO_MW + MAKERI_MW + COCACOLA_MW + SECRETARIAT_MW + BUKURU_MW + LIBERTY_DAM_MW + IBRAHIM_TAIWO_MW + INDUSTRIAL_JOS_MW + NEW_GOVT_HOUSE_JOS_MW;
    const zaria_jos_avg = UNIJOS_MW + WEST_OF_MINES_MW;
    const yandev_gboko_avg = BCC1_MW + BCC2_MW
    //
    const zones_data = [
      {name: "Bauchi", status: Bauchi_status, currentUsage: (Bauchi_Energy/1000).toFixed(2), dailyAverage: (bauchi_avg).toFixed(2), peakDemand: (Bauchi_Energy/1000).toFixed(2)},
      {name: "Gombe", status: Gombe_status, currentUsage: (Gombe_Energy/1000).toFixed(2), dailyAverage: (gombe_avg).toFixed(2), peakDemand: (Gombe_Energy/1000).toFixed(2)},
      {name: "Makari Jos",  status: Makari_Jos_status, currentUsage: (Makari_Jos_Energy/1000).toFixed(2), dailyAverage: (makari_jos_avg).toFixed(2), peakDemand: (Makari_Jos_Energy/1000).toFixed(2)},
      {name: "Zaria Road Jos",  status: Zaria_Jos_status, currentUsage: (Zaria_Jos_Energy/1000).toFixed(2), dailyAverage: (zaria_jos_avg).toFixed(2), peakDemand: (Zaria_Jos_Energy/1000).toFixed(2)},
      {name: "Yandev Gboko", status: Yandev_Gboko_status, currentUsage: (Yandev_Gboko_Energy/1000).toFixed(2), dailyAverage: (yandev_gboko_avg).toFixed(2), peakDemand: (Yandev_Gboko_Energy/1000).toFixed(2)},
    ];

    const mockData = getMockData();
    this.setState({ data: mockData });
    const data = mockData || [];
    //  Calculate average availability
    const dashboard_data = {
      totalAvgMW, totalEnergy, zones_data, data
    }
    localStorage.setItem('dashboard_data', JSON.stringify(dashboard_data || {}));
    window.dispatchEvent(new Event("dashboard_data")); // Notify child component
    this.setState({dashboard_data, isLoading_dashboard: false, error_dashboard: null});
    } catch (err) {
      this.setState({ error_dashboard: err });
      reportError(err);
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
//   Dashboard Data fetch end

  // Availability data fetch
  async fetchAvailability() {
    console.log(" I am fired")
      try {
        this.setState({ isLoading: true });
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
          // Get the Total Energy and Uptime
          let totalEnergy = 0, totalUptime = 0, totalEnergyTime = '', totalMW = 0, energyByZone = {};
          let energy_for_zone = {Bauchi: 0, Gombe: 0, 'Zaria Road Jos': 0, 'Yandev Gboko': 0, 'Makari Jos': 0};
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
                energy_for_zone[temp_feeder_zone] = energy_for_zone[temp_feeder_zone] + feeder_data[0].actualEnergyConsumption;
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
                temp_object.actualEnergyConsumption = feeder_data[0].actualEnergyConsumption;
                totalEnergy += feeder_data[0].actualEnergyConsumption;
                totalUptime += feeder_data[0].upTimeHours;
                totalEnergyTime = new Date().getHours() + ":" + new Date().getMinutes();
                totalMW += feeder_data[0].power;
                complete_data.push(temp_object);              
              });
            })          
          }
          // console.log(energy_for_zone, "  energyByZone");
          const dashboardCompute = {totalEnergy, totalEnergyTime, totalUptime, totalMW, energy_for_zone};
          localStorage.setItem("complete_data", JSON.stringify(complete_data));
          window.dispatchEvent(new Event("complete_data")); // Notify child component
          localStorage.setItem("dashboardCompute", JSON.stringify(dashboardCompute));
          window.dispatchEvent(new Event("dashboardCompute")); // Notify child component
          console.log(dashboardCompute, " the total data")
          this.setState({complete_data, dashboardCompute});
          this.setState({ error: null });
        })
        .catch(err => {
          this.setState({ error: err });
        })
        .finally(() => {
          this.setState({ isLoading: false });
          this.setState({ isFirstLoading: false });
        });
      } catch (err) {
        this.setState({ error: err });
      } finally {
        // this.setState({ isLoading: false });
      }
  }
  // Availability Data fetch end

  render() {
    // Get the data to pass to the AvailabilityOverview component
    const { isLoading, error, complete_data, isFirstLoading, dashboardCompute } = this.state;
    // console.log( isFirstLoading, " isFirstLoading App", complete_data);

     //  Dashboard Overview Start

    // Get the data to pass to the DashboardOverview component
    const { app_zone_data, dashboard_data } = this.state;
    
    //  Dashboard Overview End
    return (
      <Router>
        <div className="app" data-name="app">  
          <Routes>
              <Route exact path="/" element={<AppLayout setSideBarWidth={this.setSideBarWidth} />} >
                {/* Home Route */}
                <Route index element={<IndexPage />} />
                {/* Alert Panel Route */}
                {/* Dashboard Route */}
                <Route path="dashboard" element={<DashboardLayout side_bar_width={this.state.side_bar_width} />} >
                  <Route index element={<DashboardOverview 
                    side_bar_width={this.state.side_bar_width} 
                    dashboard_data={dashboard_data}
                    dashboardCompute={dashboardCompute}
                  />} />
                  <Route path=":zoneId" element={<DashboardZoneDetails 
                    zones_data={app_zone_data} 
                    side_bar_width={this.state.side_bar_width}
                    complete_data={complete_data}
                  />} />
                </Route>
                {/* Availability Route */}
                <Route path="availability" element={<AvailabilityLayout side_bar_width={this.state.side_bar_width} />} >
                  <Route index element={<AvailabilityOverview 
                    side_bar_width={this.state.side_bar_width} 
                    isLoading={isLoading}
                    error={error}
                    complete_data={complete_data}
                    isFirstLoading={isFirstLoading}
                    dashboardCompute={dashboardCompute}
                  />} />
                  <Route path=":zoneId" element={<AvailabilityDetail />} />
                </Route>
                {/* Alerts Route */}
                <Route path="alerts" element={<AlertPanelLayout />} >
                  <Route index element={<AlertPanelDetails />} />
                </Route>
                {/* Payments Route */}
                {/* Analytics */}
                {/* Settinngs */}
              </Route>              
          </Routes>
         </div>
      </Router>
      
    );
  }
}

export default App;
