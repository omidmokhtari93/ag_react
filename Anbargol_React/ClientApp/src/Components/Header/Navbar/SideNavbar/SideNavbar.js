import React from 'react';
import './SideNavbar.module.css';
import NavBarItems from '../NavBarItems/NavBarItem';
import CloseButton from '../CloseButton/CloseButton';
import Wrapper from '../../../../Shared/Wrapper/Wrapper';
import Backdrop from '../../../../UI/Backdrop/Backdrop';

const SideNavbar = props => {
    return (
        <Wrapper>
            <Backdrop show={props.show} dismiss={props.close}/>
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
        </Wrapper>
    )
}

export default SideNavbar;