import React from 'react';
import Dashboard from './pages/Dashboard_class';
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
      <div className="app" data-name="app">
        <Dashboard />
      </div>
    );
  }
}

export default App;
