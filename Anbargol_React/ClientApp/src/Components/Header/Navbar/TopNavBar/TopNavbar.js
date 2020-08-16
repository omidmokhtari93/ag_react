import React, { Component } from 'react';
import './TopNavbar.module.css';
import SideNavar from '../SideNavbar/SideNavbar'
import Wrapper from '../../../../Shared/Wrapper/Wrapper'
import ShowButton from '../ShowButton/ShowButton';
import NavBarItems from '../NavBarItems/NavBarItem';

class Navbar extends Component {
    state = {
        showSideBar: false
    }

    handleShowSideBar = (e) => {
        e === 'show'
            ? this.setState({ showSideBar: true })
            : this.setState({ showSideBar: false })
    }

    render() {
        return (
            <Wrapper>
                <SideNavar close={this.handleShowSideBar} show={this.state.showSideBar} />
                <nav className="sans navbar navbar-expand-sm navbar-light bg-light p-0">
                    <ShowButton show={this.handleShowSideBar} />
                    <ul className="navbar-nav" id="navigationBar">
                        <NavBarItems />
                    </ul>
                </nav>
            </Wrapper >
        )
    }
}
export default Navbar;