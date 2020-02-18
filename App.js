import React, { Component } from 'react';
import Router from './src/Router';
import axios from 'axios'
import { Scene, Stack } from 'react-native-router-flux';
// import SplashScreen from 'react-native-splash-screen';

import {SignIn} from './src/views/SignIn/SignIn';
import {SignUp} from './src/views/SignUp';
export default class App extends Component {
  render() {
    return (
      <Router />
    );
  }

  // componentDidMount(){
  //   SplashScreen.hide();
  // }
  
  componentWillMount() {
    axios.defaults.baseURL = "";
    axios.defaults.timeout = 40000;
  }
}