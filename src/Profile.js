'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
var Parse = require('parse/react-native');
var Button = require('./Button');

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userEmail: "",
      licensePlate: [],
      registeredState: [],
    };
  }
  componentWillMount() {
    this.fetchVehicleDetails();
  }
  componentWillUpdate() {
  }
  render() {
    const { page } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.titleContainer}>
          Hi {this.state.username}!
        </Text>
        <Text style={styles.titleContainer}>
          Your registered vehicles are,
        </Text>
        <View>
        {this.displayCars()}
        </View>
        <Button text="Edit vehicles" onPress={this.updateVehicleInfo.bind(this)}/>
      </View>
    );
  }
  fetchVehicleDetails() {
    var currentUser = Parse.User.current();
    var userJSON = JSON.stringify(currentUser);
    var userinfo = eval ("(" + userJSON + ")");
    this.setState({username: userinfo.username});
    this.setState({userEmail: userinfo.email});
    var vehicle = Parse.Object.extend("Vehicle");
    var query = new Parse.Query(vehicle);
    query.equalTo("username", userinfo.username);
    query.find({
      success: (results) => {
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          this.setState({
                 licensePlate: this.state.licensePlate.concat([object.get('licensePlate')]),
                 registeredState: this.state.registeredState.concat([object.get('registeredState')]),
            });
        }
      },
      error: (error) => {
        console.log("Error: " + error.code + " " + error.message);
      }
    });
  }
  displayCars() {
    return this.state.licensePlate.map((str,index) => {
      return (<Text key={str} style={styles.titleContainer}>Vehicle {index+1}: {str}</Text>);
    })
  }
  updateVehicleInfo() {
    this.props.navigator.push({name: 'updateVehicles'});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#a52a2a',
  },
  titleContainer: {
    fontSize: 20,
    fontFamily: 'Helvetica',
    marginBottom: 20,
  },
});

module.exports = Profile;
