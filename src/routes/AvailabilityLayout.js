import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter';
import { Outlet } from 'react-router-dom';

class Availability_Layout extends Component {

  render() {
    
    return (
      <div className="dashboard-container w-full" data-name="dashboard">          
          <main className="dashboard-container w-full" >
            <Outlet />
          </main>
      </div>
    );
  }
}

export default withRouter(Availability_Layout);
