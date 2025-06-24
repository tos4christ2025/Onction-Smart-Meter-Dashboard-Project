import React, { Component } from "react";

export class PowerDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 5,
      filter: "All",
    };
  }

  handlePageChange = (direction) => {
    this.setState((prevState) => ({
      currentPage: direction === "next" ? prevState.currentPage + 1 : prevState.currentPage - 1,
    }));
  };

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value, currentPage: 1 });
  };

  exportToCSV = () => {
    const { data } = this.props;
    const header = "Date,Time,Megawatts,Voltage,Amperes,Feeder Status\n";
    const rows = data.map(
      (r) => `${r.date},${r.time},${r.megawatts},${r.voltage},${r.amperes},${r.feederStatus}`
    );
    const csv = header + rows.join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "power_data.csv";
    a.click();
  };

  renderStatusBadge(status) {
    const style =
      status.toLowerCase() === "online"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700";
    return (
      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${style}`}>
        {status}
      </span>
    );
  }

  render() {
    const { data } = this.props;
    const { currentPage, itemsPerPage, filter } = this.state;

    const filteredData =
      filter === "All" ? data : data.filter((d) => d.feederStatus === filter);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const visibleData = filteredData.slice(start, start + itemsPerPage);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium mr-2">Filter:</label>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={filter}
              onChange={this.handleFilterChange}
            >
              <option>All</option>
              <option>Online</option>
              <option>Offline</option>
            </select>
          </div>
          <button
            onClick={this.exportToCSV}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 rounded-xl shadow-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Megawatts</th>
                <th className="px-4 py-3 text-left">Voltage</th>
                <th className="px-4 py-3 text-left">Amperes</th>
                <th className="px-4 py-3 text-left">Feeder Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800 text-sm">
              {visibleData.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2">{r.date}</td>
                  <td className="px-4 py-2">{r.time}</td>
                  <td className="px-4 py-2">{r.megawatts}</td>
                  <td className="px-4 py-2">{r.voltage}</td>
                  <td className="px-4 py-2">{r.amperes}</td>
                  <td className="px-4 py-2">{this.renderStatusBadge(r.feederStatus)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <div className="space-x-2">
            <button
              onClick={() => this.handlePageChange("prev")}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => this.handlePageChange("next")}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}
