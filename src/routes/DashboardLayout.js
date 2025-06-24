import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { withRouter } from '../utils/withRouter';

class DashboardLayout extends Component {

  render() {

    return (
      <div className="dashboard-container" data-name="dashboard">
        <main  className='dashboard-main w-full' data-name="dashboard">
            <Outlet />
        </main>
      </div>
    );
  }
}

export default withRouter(DashboardLayout);
