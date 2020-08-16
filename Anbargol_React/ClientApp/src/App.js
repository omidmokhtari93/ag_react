import React, { Component } from 'react';
import Navbar from './Components/Header/Navbar/TopNavBar/TopNavbar';
import Wrapper from './Shared/Wrapper/Wrapper';

export default class App extends Component {
  render() {
    return (
      <Wrapper>
        <div className="container sans">
        <Navbar />

          تست
        </div>
      </Wrapper>
    );
  }
}
