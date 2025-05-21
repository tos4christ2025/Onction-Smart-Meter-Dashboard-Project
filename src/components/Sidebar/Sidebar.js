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

        return (
            <div className="sidebar" data-name="sidebar">
                <div className="sidebar-header" data-name="sidebar-header">
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
