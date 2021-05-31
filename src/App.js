import './App.css';
import * as React from 'react';
import {Fragment} from 'react';
import HomePage from "./Components/HomePage/HomePage";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {Header} from './Components/Header/Header'
import {LoginForm} from "./Components/Login/Login";
import {Marks} from "./Components/Marks/Marks";
import {reducer, getGroupsRequest} from "./redux/saga";
import {useSelector} from "react-redux";

function App() {
    const isAuthorized = useSelector(state => state.isAuthorized);
  return (
      <div className="App">
        <BrowserRouter>
          <Fragment>
              <Header/>
            <Switch>
              <Route path='/' component={HomePage} exact={true}/>
              <Route path='/login' component={LoginForm} exact={true}/>
              <Route path='/marks' component={Marks} exact={true}/>
              <Route path='/admin' component={isAuthorized ? Marks : LoginForm} exact={true}/>
              <Redirect to='/'/>
            </Switch>
          </Fragment>
        </BrowserRouter>
      </div>
  );
}

export default App;