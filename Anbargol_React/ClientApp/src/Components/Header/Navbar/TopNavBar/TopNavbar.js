import React, { Component } from 'react';
import './TopNavbar.module.css';
import SideNavar from '../SideNavbar/SideNavbar'
import Wrapper from '../../../../Shared/Wrapper/Wrapper'
import ShowButton from '../ShowButton/ShowButton';
import NavBarItems from '../NavBarItems/NavBarItem';
import Logo from '../../../../UI/Logo/Logo';
import SearchBoxNoRedux from '../../../../UI/SearchBox/SearchBox_NonRedux';

class Navbar extends Component {
    state = {
        showSideBar: false
    }

    handleShowSideBar = (e) => {
        e === 'show'
            ? this.setState({ showSideBar: true })
            : this.setState({ showSideBar: false })
    }

    handleSearch = res => {
        console.log(res)
    }

    render() {
        return (
            <Wrapper>
                <SideNavar close={this.handleShowSideBar} show={this.state.showSideBar} />
                <nav className="sans navbar navbar-expand-sm navbar-light bg-light p-2 border-bottom">
                    <Logo />
                    <ul className="navbar-nav pr-4" id="navigationBar">
                        <NavBarItems />
                    </ul>
                    <SearchBoxNoRedux
                        url="http://2.180.37.75/anbargol/api/search"
                        reqParam={['name', 'code']}                                     //request parameters
                        resParam={['GolName', 'Format', 'Color', 'ColorType', 'Code']}  //response parameters
                        id="Id"                                                         //this is identity that choose in dropdown
                        width="17"
                        placeholder="جستجوی سریع گل"
                        handleResponse={this.handleSearch}                              // return an object contain Flower Name and Flower Id
                    />
                    <ShowButton show={this.handleShowSideBar} />
                </nav>
            </Wrapper>
        )
    }
}
export default Navbar;