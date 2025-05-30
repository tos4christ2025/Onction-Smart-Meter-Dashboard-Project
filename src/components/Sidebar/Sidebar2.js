import React, { Component } from "react";

export class Sidebar extends Component {
  render() {
    const {
      collapsed,
      onToggleCollapse,
      onToggleSection,
      sections,
      onSelectZone,
    } = this.props;

    return (
      <div
        className={`bg-white border-r border-gray-200 p-4 transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <button
          onClick={onToggleCollapse}
          className="mb-4 text-sm bg-gray-300 px-2 py-1 rounded"
        >
          {collapsed ? "▶" : "◀ Collapse"}
        </button>

        {!collapsed && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Sections</h2>
              <div className="space-y-2 mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={sections.showUsageChart}
                    onChange={() => onToggleSection("showUsageChart")}
                    className="mr-2"
                  />
                  Usage Chart
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={sections.showAlerts}
                    onChange={() => onToggleSection("showAlerts")}
                    className="mr-2"
                  />
                  Alerts Panel
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={sections.showEnergyFlow}
                    onChange={() => onToggleSection("showEnergyFlow")}
                    className="mr-2"
                  />
                  Energy Flow
                </label>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Zones</h2>
              <select
                className="mt-2 w-full border border-gray-300 rounded p-1"
                onChange={(e) => onSelectZone(e.target.value)}
              >
                <option value="Zone A">Zone A</option>
                <option value="Zone B">Zone B</option>
                <option value="Zone C">Zone C</option>
              </select>
            </div>
          </div>
        )}
      </div>
    );
  }
}
