'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
var Parse = require('parse/react-native');
var Button = require('./Button');

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "default",
    };
  }

  render() {
    const { page } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Hi!
        </Text>
        <Text> {this.pullUserInfo.bind(this)} </Text>
        <Text> {this.state.name} </Text>
        <Text style={styles.welcome}>
          Your registered cars are,
        </Text>
        <Button text="Refresh" onPress={this.pullUserInfo.bind(this)}/>
      </View>
    );
  }
  pullUserInfo(){
    var currentUser = Parse.User.current();
    var test = JSON.stringify(currentUser);
    var userinfo = eval ("(" + test + ")");
    this.setState({name: userinfo.name});
    return userinfo.name;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

module.exports = Profile;
