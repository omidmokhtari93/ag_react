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
        showSideBar: false,
        searhcBox: {
            url: "/api/SearchGol",
            reqParam: ['name', 'code'], //request parameters
            resParam: ['golName', 'format', 'color', 'colorType', 'code'], //response parameters
            id: "Id", //this identity related choosen item in dropdown
            width: "25",
            placeholder: "جستجوی سریع گل",
            handleResponse: (res) => this.handleSearch(res), // return an object contain Flower Name and Flower Id
            removeOnChoose: false,
            timeout: "400",
            name: "searchbox",
            searchBoxValue: '',
        }
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
                <nav className="sans navbar navbar-expand-sm navbar-light bg-light p-2 border-bottom" id="top-navbar">
                    <Logo />
                    <ul className="navbar-nav pr-4" id="navigationBar">
                        <NavBarItems />
                    </ul>
                    <SearchBoxNoRedux
                        {...this.state.searhcBox}
                    />
                    <ShowButton show={this.handleShowSideBar} />
                </nav>
            </Wrapper>
        )
    }
}
export default Navbar;