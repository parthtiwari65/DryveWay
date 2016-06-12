'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

var Signup = require('./Signup');
var Button = require('./Button');

class Welcome extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
            <Text style={styles.welcome}>Welcome to</Text>
            <Text style={styles.dryvewayHeading}>DryveWay</Text>
            <Button text="Log in" onPress={this.onLoginPress.bind(this)}/>
            <Button text="Sign up" onPress={this.onSignupPress.bind(this)}/>
            <Text style={styles.explanationText}>
            DryveWay is a utility app that helps people reach out to the
            owner of vehicle anonymously in cases such as 'vehicle parked in your drive way' or
            'car fully charged but still plugged-in' or
            'car swiped accidently'.
            </Text>
      </View>
    );
  }

  onLoginPress() {
    this.props.navigator.push({name: 'signin'});
  }
  onSignupPress() {
    this.props.navigator.push({name: 'signup'});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  dryvewayHeading: {
    fontFamily: 'Helvetica',
    fontSize: 40,
    fontWeight: 'bold',
    paddingBottom: 100,
  },
  welcome: {
    fontFamily: 'Helvetica',
    fontSize: 20,
  },
  explanationText: {
    fontFamily: 'Helvetica',
    width: 200,
    height: 200,
    fontSize: 15,
    marginTop: 50
  },
});

module.exports = Welcome;
