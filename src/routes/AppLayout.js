import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { withRouter } from '../utils/withRouter';
import Sidebar from '../components/Sidebar/Sidebar';
import '../styles/landing_page.css'

class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedZone: "Zone A",
      sidebarCollapsed: window.innerWidth >= 768 ? false : true,
      viewMode: "daily", // hourly, daily, weekly
      side_bar_width: window.innerWidth >= 768 ? "250px" : "60px",
      overflow: "overflow-scroll",
    };
  }

  toggleSidebar = () => {
    this.setState((prevState) => {
      if(prevState.sidebarCollapsed) {
        this.props.setSideBarWidth("250px");
      } else this.props.setSideBarWidth("60px");
      return ({ 
      sidebarCollapsed: !prevState.sidebarCollapsed,  
      side_bar_width: prevState.sidebarCollapsed ? "250px" : "60px",
      overflow: prevState.sidebarCollapsed ? "overflow-scroll" : "overflow-hidden-scroll",
    })
  });
  };

  handleViewModeChange = (mode) => {
    this.setState({ viewMode: mode });
  };

  render() {
    const {
      sidebarCollapsed,
      side_bar_width,
      overflow
    } = this.state;

    return (
      <div className="dashboard-container" data-name="dashboard">
        <div data-name="sidebar">
          <Sidebar 
            collapsed={sidebarCollapsed}
            onToggleCollapse={this.toggleSidebar}
            side_bar_width={side_bar_width}
            overflow={overflow}            
            onSelectZone={(zone) => this.setState({ selectedZone: zone })}
          />
        </div>
        <main style={{marginLeft: side_bar_width}}  className='dashboard-main w-full' data-name="dashboard">
            <Outlet />
        </main>
      </div>
    );
  }
}

export default withRouter(AppLayout);
