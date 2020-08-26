
import React from 'react';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import history from '../history';
import { Container } from '@material-ui/core'
import customerList from './customers/customerList';
import customerNavigator from './customers/customerNavigator'
import productsOverview from './products/productsOverview';
import UserNav from './userNav'

const Main = () => {
  return (
    <Container>
      <BrowserRouter history={history}>
          <Switch>
            <Route path ="/platform" component={UserNav} />
          </Switch>
      </BrowserRouter>
      </Container>
  );
};

export default Main;