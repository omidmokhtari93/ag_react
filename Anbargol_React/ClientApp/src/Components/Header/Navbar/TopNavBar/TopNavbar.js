import React, { Component } from 'react';
import './TopNavbar.module.css';
import SideNavar from '../SideNavbar/SideNavbar'
import Wrapper from '../../../../Shared/Wrapper/Wrapper'
import ShowButton from '../ShowButton/ShowButton';
import NavBarItems from '../NavBarItems/NavBarItem';
import Logo from '../../../../UI/Logo/Logo';
import SearchBox from '../../../../UI/SearchBox/SearchBox';

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
                <nav className="sans navbar navbar-expand-sm navbar-light bg-light p-0 pl-3 pr-3">
                    <Logo />
                    <ul className="navbar-nav pr-4" id="navigationBar">
                        <NavBarItems />
                    </ul>
                    <SearchBox
                        width="17"
                        placeholder="جستجوی سریع گل"
                        url="http://2.180.37.75/anbargol/api/search"
                    />

                    <ShowButton show={this.handleShowSideBar} />
                </nav>
            </Wrapper>
        )
    }
}
export default Navbar;