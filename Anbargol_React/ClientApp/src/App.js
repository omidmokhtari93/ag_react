import React, { Component, Suspense, lazy } from 'react';
import Navbar from './Components/Header/Navbar/TopNavBar/TopNavbar';
import { Route, Switch } from 'react-router-dom';
import ErrorPage from './Shared/ErrorPage/ErrorPage';
import ErrorBoundary from './Shared/ErrorBoundary/ErrorBoundary';
import Loading from './UI/Loading/Loading';

const AddNewFlower = lazy(() => import('./Components/Body/AddNewFlower/AddNewFlower'))
const AddFlowerForms = lazy(() => import('./Components/Body/AddFlowerForms/AddFlowerForms'))
const AddFlowerItems = lazy(() => import('./Components/Body/AddFlowerItems/AddFlowerItems'))
const AddFlowerOrders = lazy(() => import('./Components/Body/AddFlowerOrders/AddFlowerOrder'))

const LoadingElement = <div className="text-center">
  <Loading show={true} style={{ width: '30px' }} />
</div>

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container sans p-4 border mt-3">
          <ErrorBoundary>
            <Suspense fallback={LoadingElement}>
              <Switch>
                <Route path="/addnew" render={() => <AddNewFlower />} />
                <Route path="/addforms/:flowerId" exact render={() => <AddFlowerForms />} />
                <Route path="/additems/:flowerId" exact render={() => <AddFlowerItems />} />
                <Route path="/addorders/:flowerId" exact render={() => <AddFlowerOrders />} />
                <Route render={() => <ErrorPage />} />
              </Switch>
            </Suspense>
          </ErrorBoundary>
        </div>
      </React.Fragment>
    );
  }
}
