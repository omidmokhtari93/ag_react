import React from 'react';
import './SideNavbar.module.css';
import NavBarItems from '../NavBarItems/NavBarItem';
import CloseButton from '../CloseButton/CloseButton';

const SideNavbar = props => {
    return (
        <div className="side-nav"
            style={props.show
                ? { left: 0 }
                : { left: '-50%' }}>
            <div >
                <CloseButton close={props.close} />
            </div>
            <nav className="sans navbar navbar-light text-right" id="side-navbar">
                <ul className="navbar-nav">
                    <NavBarItems />
                </ul>
            </nav>
        </div>
    )
}

export default SideNavbar;