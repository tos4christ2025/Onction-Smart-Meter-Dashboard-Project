import React, { useState } from 'react';
import MenuItem from './MenuItem';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'dashboard',
        };
    }
    componentDidCatch(error, info) {
        console.error('Error caught in Sidebar:', error, info);
        reportError(error);
    }
    render() {
        const { activeItem } = this.state;
        const {
            collapsed,
            onToggleCollapse,
            onToggleSection,
            sections,
            onSelectZone,
            side_bar_width,
            overflow,
        } = this.props;
        console.log(overflow)
        return (
            <div
                // style={{width: collapsed ? "4rem" : "15rem"}}
                style={{width: side_bar_width}}
                data-name="sidebar"
                className={`sidebar bg-red ${overflow} border-r border-gray-200 p-4 transition-all duration-300 ${
                collapsed ? "w-16" : "w-64"
                }`}
            >
                <button
                    style={{ position: "fixed", top: 10, left: 10 }}
                    onClick={onToggleCollapse}
                    className="mb-4 text-sm bg-gray-300 px-2 py-1 rounded"
                    >
                    {collapsed ? "▶" : "◀ Collapse"}
                </button>

                {!collapsed && (<div className="" data-name="sidebar">
                    <div className="sidebar-header mt-4" data-name="sidebar-header">
                        <h1 className="text-xl font-bold" data-name="sidebar-title">
                            Onction Energy Performance Dashboard
                        </h1>
                    </div>
                    
                    <MenuItem 
                        icon="fa-chart-line" 
                        label="Dashboard"
                        isActive={activeItem === 'dashboard'}
                        onClick={() => this.setState({ activeItem: 'dashboard' })}
                    />                
                    <MenuItem 
                        icon="fa-bolt" 
                        label="Energy Zones"
                        isActive={activeItem === 'zones'}
                        onClick={() => this.setState({ activeItem: 'zones' })}
                    >
                        <MenuItem 
                            icon="fa-circle" 
                            label="Zone A"
                            isActive={activeItem === 'zone-a'}
                            onClick={() => this.setState({ activeItem: 'zone-a' })}
                        />
                        <MenuItem 
                            icon="fa-circle" 
                            label="Zone B"
                            isActive={activeItem === 'zone-b'}
                            onClick={() => this.setState({ activeItem: 'zone-b' })}
                        />
                    </MenuItem>
                    <MenuItem 
                        icon="fa-chart-pie" 
                        label="Availability"
                        isActive={activeItem === 'availability'}
                        onClick={() => this.setState({ activeItem: 'availability' })}
                    />
                    <MenuItem 
                        icon="fa-chart-pie" 
                        label="Payments"
                        isActive={activeItem === 'payments'}
                        onClick={() => this.setState({ activeItem: 'payments' })}
                    />
                    <MenuItem 
                        icon="fa-chart-pie" 
                        label="Energy"
                        isActive={activeItem === 'consumption'}
                        onClick={() => this.setState({ activeItem: 'consumption' })}
                    />
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
                        onClick={() => this.setState({ activeItem: 'alerts' })}
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
    // try {
    //     const [activeItem, setActiveItem] = useState('dashboard');

    //     return (
    //         <div className="sidebar" data-name="sidebar">
    //             <div className="sidebar-header" data-name="sidebar-header">
    //                 <h1 className="text-xl font-bold" data-name="sidebar-title">
    //                     Smart Meter Dashboard
    //                 </h1>
    //             </div>
                
    //             <MenuItem 
    //                 icon="fa-chart-line" 
    //                 label="Dashboard"
    //                 isActive={activeItem === 'dashboard'}
    //                 onClick={() => setActiveItem('dashboard')}
    //             />
                
    //             <MenuItem 
    //                 icon="fa-bolt" 
    //                 label="Energy Zones"
    //                 isActive={activeItem === 'zones'}
    //                 onClick={() => setActiveItem('zones')}
    //             >
    //                 <MenuItem 
    //                     icon="fa-circle" 
    //                     label="Zone A"
    //                     isActive={activeItem === 'zone-a'}
    //                     onClick={() => setActiveItem('zone-a')}
    //                 />
    //                 <MenuItem 
    //                     icon="fa-circle" 
    //                     label="Zone B"
    //                     isActive={activeItem === 'zone-b'}
    //                     onClick={() => setActiveItem('zone-b')}
    //                 />
    //             </MenuItem>
                
    //             <MenuItem 
    //                 icon="fa-chart-pie" 
    //                 label="Analytics"
    //                 isActive={activeItem === 'analytics'}
    //                 onClick={() => setActiveItem('analytics')}
    //             />
                
    //             <MenuItem 
    //                 icon="fa-bell" 
    //                 label="Alerts"
    //                 isActive={activeItem === 'alerts'}
    //                 onClick={() => setActiveItem('alerts')}
    //             />
                
    //             <MenuItem 
    //                 icon="fa-gear" 
    //                 label="Settings"
    //                 isActive={activeItem === 'settings'}
    //                 onClick={() => setActiveItem('settings')}
    //             />
    //         </div>
    //     );
    // } catch (error) {
    //     console.error('Sidebar component error:', error);
    //     reportError(error);
    //     return null;
    // }
}

export default Sidebar;
