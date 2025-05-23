import React, { Component } from "react";
import { Card, CardContent } from "./components/ui/Card";
import { Sidebar } from "./components/Sidebar";
import { EnergyFlowDiagram } from "./components/EnergyFlowDiagram";
import { UsageChart } from "./components/UsageChart";
import { AlertsPanel } from "./components/AlertsPanel";
import { ZoneSelector } from "./components/ZoneSelector";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedZone: "Zone A",
      sidebarCollapsed: false,
      showUsageChart: true,
      showAlerts: true,
      showEnergyFlow: true,
      viewMode: "daily", // hourly, daily, weekly
    };
  }

  toggleSidebar = () => {
    this.setState((prevState) => ({ sidebarCollapsed: !prevState.sidebarCollapsed }));
  };

  toggleSection = (section) => {
    this.setState((prevState) => ({ [section]: !prevState[section] }));
  };

  handleViewModeChange = (mode) => {
    this.setState({ viewMode: mode });
  };

  render() {
    const {
      selectedZone,
      sidebarCollapsed,
      showUsageChart,
      showAlerts,
      showEnergyFlow,
      viewMode,
    } = this.state;

    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={this.toggleSidebar}
          onToggleSection={this.toggleSection}
          sections={{
            showUsageChart,
            showAlerts,
            showEnergyFlow,
          }}
          onSelectZone={(zone) => this.setState({ selectedZone: zone })}
        />
        <main className="flex-1 p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {showUsageChart && (
              <Card className="flex-1">
                <CardContent>
                  <ZoneSelector selectedZone={selectedZone} onSelect={(zone) => this.setState({ selectedZone: zone })} />

                  <div className="flex gap-2 my-2">
                    {['hourly', 'daily', 'weekly'].map((mode) => (
                      <button
                        key={mode}
                        className={`px-3 py-1 rounded ${viewMode === mode ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => this.handleViewModeChange(mode)}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>

                  <UsageChart zone={selectedZone} view={viewMode} />
                </CardContent>
              </Card>
            )}
            {showAlerts && (
              <Card className="w-full md:w-1/3">
                <CardContent>
                  <AlertsPanel zone={selectedZone} />
                </CardContent>
              </Card>
            )}
          </div>
          {showEnergyFlow && (
            <Card>
              <CardContent>
                <EnergyFlowDiagram zone={selectedZone} />
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    );
  }
}
