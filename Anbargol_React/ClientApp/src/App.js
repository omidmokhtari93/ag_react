import React, { Component } from 'react';
import Navbar from './Components/Header/Navbar/TopNavBar/TopNavbar';
import Wrapper from './Shared/Wrapper/Wrapper';
import AddNewFlower from './Components/Body/AddNewFlower/AddNewFlower';
import AddFlowerForms from './Components/Body/AddFlowerForms/AddFlowerForms';
import AddFlowerItems from './Components/Body/AddFlowerItems/AddFlowerItems';
import { Route, Redirect, Switch } from 'react-router-dom';
import ErrorPage from './Shared/ErrorPage/ErrorPage';
import AddFlowerOrders from './Components/Body/AddFlowerOrders/AddFlowerOrder';
import ErrorBoundary from './Shared/ErrorBoundary';

export default class App extends Component {
  render() {
    return (
      <Wrapper>
        <Navbar />
        <div className="container sans p-4 border mt-3">
          <ErrorBoundary>
            <Switch>
              <Route path="/addnew" render={() => <AddNewFlower />} />
              <Route path="/addforms/:flowerId" exact render={() => <AddFlowerForms />} />
              <Route path="/additems/:flowerId" exact render={() => <AddFlowerItems />} />
              <Route path="/addorders/:flowerId" exact render={() => <AddFlowerOrders />} />
              <Route render={() => <ErrorPage />} />
            </Switch>
          </ErrorBoundary>
        </div>
      </Wrapper>
    );
  }
}
