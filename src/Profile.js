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
      username: "default",
    };
  }

  render() {
    const { page } = this.state;
    this.pullUserInfo.bind(this);
    return (
      <View style={styles.container}>
        <Text style={styles.titleContainer}>
          Hi! {this.state.username}
        </Text>
        <Text style={styles.titleContainer}>
          Your registered cars are,
        </Text>
        <Button text="Refresh" onPress={this.pullUserInfo.bind(this)}/>
      </View>
    );
  }
  pullUserInfo() {

    var currentUser = Parse.User.current();
    var test = JSON.stringify(currentUser);
    var userinfo = eval ("(" + test + ")");
    this.setState({name: userinfo.username});
    alert(test);
    return userinfo.username;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  titleContainer: {
    fontSize: 20,
    fontFamily: 'Helvetica',
  },
});

module.exports = Profile;
