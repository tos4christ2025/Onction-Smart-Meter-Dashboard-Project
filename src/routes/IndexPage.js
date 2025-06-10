import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter';

class IndexPage extends Component {

  render() {

    return (
      <main  className='dashboard-main w-full' data-name="dashboard">
            <div className="landingpage_container h-screen">
              <h1>Welcome to Onction Energy</h1>
                <p>Take control of your energy data and insights. Navigate through the sidebar to access real-time analytics, reports, and management tools.</p>
                <p>Click the button below to go to your dashboard and start exploring.</p>
              <button className="cta"><a href='/dashboard'>Go to Dashboard</a></button>
            </div>
        </main>
    );
  }
}

export default withRouter(IndexPage);
