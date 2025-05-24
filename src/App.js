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
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/alerts" element={<AlertPanel />} />
              <Route path="/availability/*" element={<Availability_Details />} />
              <Route path="/availability/:zoneId/*" element={<Availability />} />       
          </Routes>
         </div>
      </Router>
      
    );
  }
}

export default App;
