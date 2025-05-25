import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AlertPanel from './components/Dashboard/AlertPanel';
import Availability_Details from './pages/Availability_Details';
import Availability from './pages/Availability Pages/Availability';
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
import DashboardLayout from './routes/DashboardLayout';
import DashboardOverview from './routes/DashboardOverview'; 
import AvailabilityLayout from './routes/AvailabilityLayout';
import AvailabilityOverview from './routes/AvailabilityOverview';
import AvailabilityDetail from './routes/AvailabilityDetail';

library.add(faCoffee, faUser);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }
  componentDidMount() {
    // Global error handler
    window.onerror = (message, source, lineno, colno, error) => {
      console.error('Global error:', error);
      this.setState({ error });
      reportError(error);
    };
  }
  componentDidCatch(error, info) {
    this.setState({ error });
    console.error('Error caught in App:', error, info);
    reportError(error);
  }
  render() {
    return (
      <Router>
        <div className="app" data-name="app">  
          <Routes>
              <Route path="/" element={<DashboardLayout />} >
                <Route index element={<DashboardOverview />} />                
                <Route path="availability" element={<AvailabilityLayout />} >
                  <Route index element={<AvailabilityOverview />} />
                  <Route path=":zoneId" element={<AvailabilityDetail />} />
                </Route>
                <Route path="alerts" element={<AlertPanelLayout />} >
                  <Route index element={<AlertPanelDetails />} />
                </Route>
              </Route>              
          </Routes>
         </div>
      </Router>
      
    );
  }
}

export default App;
