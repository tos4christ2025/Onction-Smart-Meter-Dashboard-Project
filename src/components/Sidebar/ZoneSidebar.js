import React, { Component } from "react";

export class ZoneSidebar extends Component {
  render() {
    const { zones, selectedZone, onZoneChange } = this.props;

    return (
      <div style={{position:"relative", height: "65vh"}} className="w16 bg-white border-r h-full p-4 mt-6 mb-5 space-y-2 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Zones</h2>
        {zones.map((zone) => (
          <button
            key={zone}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100 ${
              selectedZone === zone ? "bg-blue-200 text-blue-900 font-bold" : "text-gray-700"
            }`}
            onClick={() => onZoneChange(zone)}
          >
            {zone}
          </button>
        ))}
      </div>
    );
  }
}
