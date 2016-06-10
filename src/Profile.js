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
      userEmail: "",
      licensePlate: [],
      registeredState: [],
    };
  }

  componentWillMount() {
    var currentUser = Parse.User.current();
    var test = JSON.stringify(currentUser);
    var userinfo = eval ("(" + test + ")");
    this.setState({username: userinfo.username});
    this.setState({userEmail: userinfo.email});
    var vehicle = Parse.Object.extend("Vehicle");
    var query = new Parse.Query(vehicle);
    query.equalTo("userEmail", userinfo.email);
    query.find({
      success: function(results) {
        alert("Successfully retrieved " + results.length + " cars.");
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          console.log(object.id + ' - ' + object.get('licensePlate'));
          //this.setState({licensePlate[i]: object.get('licensePlate')});
          //this.setState({registeredState[i]: object.get('registeredState')});
        }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }

  render() {
    const { page } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.titleContainer}>
          Hi! {this.state.username}
        </Text>
        <Text>{this.pullUserInfo.bind(this)}</Text>
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
    this.setState({username: userinfo.username});
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
