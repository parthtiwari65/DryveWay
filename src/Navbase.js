'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
} from 'react-native';

var Welcome = require('./Welcome');
var Signin = require('./Signin');
var Signup = require('./Signup');
var Main = require('./Main');
var CarReg = require('./CarReg');
var Parse = require('parse/react-native');

var ROUTES = {
  'welcome': Welcome,
  'signin': Signin,
  'signup': Signup,
  'carReg': CarReg,
  'main': Main,
};

class Navbase extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    Parse.initialize("v6kIiDEIOH37OFzYHInn");
    Parse.serverURL = 'http://dryveway.herokuapp.com/parse'
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name:'carReg'}}
        renderScene={this.renderScene.bind(this)}/>
    );
  }

  renderScene(route, navigator) {
    var Mycomponent = ROUTES[route.name];
    return <Mycomponent route={route} navigator={navigator}/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = Navbase;
