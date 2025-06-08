import React from 'react';
import MenuItem from './MenuItem';
import withRouter from '../../utils/withRouter';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: '',
        };
    }
    componentDidCatch(error, info) {
        console.error('Error caught in Sidebar:', error, info);
        reportError(error);
    }
    navigateToZone = (link) => {
        this.props.navigate(link);
    };

    render() {
        const { activeItem } = this.state;
        const {
            collapsed,
            onToggleCollapse,
            side_bar_width,
            overflow,
        } = this.props;
        
        return (
            <div
                // style={{width: collapsed ? "4rem" : "15rem"}}
                style={{width: side_bar_width, zIndex: 2}}
                data-name="sidebar"
                className={`sidebar bg-red ${overflow} border-r border-gray-200 p-4 transition-all duration-300 ${
                collapsed ? "w-16" : "w-64"
                }`}
            >
                <button
                    style={{ position: "fixed", top: 4, left: 4 }}
                    onClick={onToggleCollapse}
                    className="mb-4 text-sm bg-gray-300 px-2 py-1 rounded"
                    >
                    {collapsed ? "▶" : "◀"}
                </button>

                {!collapsed && (<div className="" data-name="sidebar">
                    <div className="sidebar-header mt-4" data-name="sidebar-header">
                        <h1 className="text-xl font-bold" data-name="sidebar-title">
                            <a href='/'>Onction Energy Performance Dashboard</a>
                        </h1>
                    </div>
                    
                    <MenuItem 
                        icon="fa-chart-line" 
                        label="Dashboard"
                        isActive={activeItem === 'dashboard'}
                        onClick={() => {
                            this.setState({ activeItem: 'dashboard' }); 
                            this.navigateToZone('/dashboard')
                        }}
                    />                
                    <MenuItem 
                        icon="fa-bolt" 
                        label="Energy Zones"
                        isActive={activeItem === 'zones'}
                        onClick={() => this.setState({ activeItem: 'zones' })}
                    >
                        <MenuItem 
                            icon="fa-circle" 
                            label="Bauchi"
                            isActive={activeItem === 'zone-a'}
                            onClick={() => {
                                this.setState({ activeItem: 'zone-a' }); 
                                // this.navigateToZone('zones/:zone-a/energy')
                            }}
                        />
                        <MenuItem 
                            icon="fa-circle" 
                            label="Gombe"
                            isActive={activeItem === 'zone-b'}
                            onClick={() => {
                                this.setState({ activeItem: 'zone-b' }); 
                                // this.navigateToZone('zones/:zone-b/energy')
                            }}
                        />
                    </MenuItem>
                    <MenuItem 
                        icon="fa-chart-pie" 
                        label="Availability"
                        isActive={activeItem === 'availability'}
                        onClick={() => {
                            this.setState({ activeItem: 'availability' });   
                            this.navigateToZone('availability');
                        }}
                    >
                        <MenuItem 
                            icon="fa-circle" 
                            label="Bauchi"
                            isActive={activeItem === 'zone-a'}
                            onClick={() => {
                                this.setState({ activeItem: 'zone-a' }); 
                                // this.navigateToZone('availability/zone-a/');
                            }}
                        />
                        <MenuItem 
                            icon="fa-circle" 
                            label="Gombe"
                            isActive={activeItem === 'zone-b'}
                            onClick={() => {
                                this.setState({ activeItem: 'zone-b' }); 
                                // this.navigateToZone('availability/zone-b/');
                            }}
                        />
                        <MenuItem 
                            icon="fa-circle" 
                            label="Makari Jos"
                            isActive={activeItem === 'zone-c'}
                            onClick={() => {
                                this.setState({ activeItem: 'zone-c' }); 
                                // this.navigateToZone('availability/zone-c/');
                            }}
                        />
                    </MenuItem>
                    <MenuItem 
                        icon="fa-chart-pie" 
                        label="Payments"
                        isActive={activeItem === 'payments'}
                        onClick={() => this.setState({ activeItem: 'payments' })}
                    >
                        <MenuItem 
                            icon="fa-circle" 
                            label="Zone A"
                            isActive={activeItem === 'zone-a'}
                            onClick={() => {
                                this.setState({ activeItem: 'zone-a' }); 
                                // this.navigateToZone('zones/:zone-a/payments')
                            }}
                        />
                        <MenuItem 
                            icon="fa-circle" 
                            label="Zone B"
                            isActive={activeItem === 'zone-b'}
                            onClick={() => {
                                this.setState({ activeItem: 'zone-b' }); 
                                // this.navigateToZone('zones/:zone-b/payments')
                            }}
                        />
                    </MenuItem>
                    <MenuItem 
                        icon="fa-chart-pie" 
                        label="Energy Usage"
                        isActive={activeItem === 'consumption'}
                        onClick={() => this.setState({ activeItem: 'consumption' })}
                    >
                        <MenuItem 
                            icon="fa-circle" 
                            label="Zone A"
                            isActive={activeItem === 'zone-a'}
                            onClick={() => {
                                this.setState({ activeItem: 'zone-a' }); 
                                // this.navigateToZone('zones/:zone-a/energy_consumption')
                            }}
                        />
                        <MenuItem 
                            icon="fa-circle" 
                            label="Zone B"
                            isActive={activeItem === 'zone-b'}
                            onClick={() => {
                                this.setState({ activeItem: 'zone-b' }); 
                                // this.navigateToZone('zones/:zone-b/energy_consumption')
                            }}
                        />
                    </MenuItem>
                    <MenuItem 
                        icon="fa-chart-pie" 
                        label="Analytics"
                        isActive={activeItem === 'analytics'}
                        onClick={() => this.setState({ activeItem: 'analytics' })}
                    />
                    <MenuItem 
                        icon="fa-bell" 
                        label="Alerts"
                        isActive={activeItem === 'alerts'}
                        onClick={() => {
                            this.setState({ activeItem: 'alerts'}); 
                            this.navigateToZone('alerts')
                        }}
                    />                
                    <MenuItem 
                        icon="fa-gear" 
                        label="Settings"
                        isActive={activeItem === 'settings'}
                        onClick={() => this.setState({ activeItem: 'settings' })}
                    />
                </div>)}
            </div>
        );
    }
}

export default withRouter(Sidebar);
