import React, { Component } from 'react';
import Navbar from './Components/Header/Navbar/TopNavBar/TopNavbar';
import Wrapper from './Shared/Wrapper/Wrapper';
import AddNewFlower from './Components/Body/AddNewFlower/AddNewFlower';
import { Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <Wrapper>
        <Navbar />
        <div className="container sans p-4 border">
          <Route path="/addnew" exact component={AddNewFlower} />
        </div>
      </Wrapper>
    );
  }
}
