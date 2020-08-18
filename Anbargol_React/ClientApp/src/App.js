import React, { Component } from 'react';
import Navbar from './Components/Header/Navbar/TopNavBar/TopNavbar';
import Wrapper from './Shared/Wrapper/Wrapper';
import AddNewFlower from './Components/Body/AddNewFlower/AddNewFlower';

export default class App extends Component {
  render() {
    return (
      <Wrapper>
        <Navbar />
        <div className="container sans">
          <AddNewFlower />
        </div>
      </Wrapper>
    );
  }
}
