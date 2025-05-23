import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showChildren: false,
        };
    }

    render() {
        try {
            const { icon, label, isActive, children, onClick } = this.props;
            return (
                <div data-name="menu-item-container">
                    <div
                        className={`menu-item ${isActive ? 'active' : ''} float-start`}
                        //  This controls hiding and showing the children
                        onClick={() => {onClick(); this.setState({ showChildren: !this.state.showChildren })}}
                        data-name="menu-item"
                    >
                        <i className={`fas ${icon} mr-2`} data-name="menu-item-icon"></i>
                        <span data-name="menu-item-label">{label}</span>
                    </div>
                        {this.state.showChildren && (
                            <div className="submenu" data-name="submenu">
                                {children}
                            </div>
                        )}
                </div>
            );
        } catch (error) {
            console.error('MenuItem component error:', error);
            reportError(error);
            return null;
        }
    }
}

MenuItem.propTypes = {
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func
};


// function MenuItem({ icon, label, isActive, children, onClick }) {
//     try {
//         return (
//             <div data-name="menu-item-container">
//                 <div 
//                     className={`menu-item ${isActive ? 'active' : ''}`}
//                     onClick={onClick}
//                     data-name="menu-item"
//                 >
//                     <i className={`fas ${icon} mr-2`} data-name="menu-item-icon"></i>
//                     <span data-name="menu-item-label">{label}</span>
//                 </div>
//                 {children && (
//                     <div className="submenu" data-name="submenu">
//                         {children}
//                     </div>
//                 )}
//             </div>
//         );
//     } catch (error) {
//         console.error('MenuItem component error:', error);
//         reportError(error);
//         return null;
//     }
// }

// MenuItem.propTypes = {
//     icon: PropTypes.string.isRequired,
//     label: PropTypes.string.isRequired,
//     isActive: PropTypes.bool,
//     children: PropTypes.node,
//     onClick: PropTypes.func
// };

export default MenuItem;
