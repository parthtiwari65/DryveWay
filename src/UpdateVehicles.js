'use strict';
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native'
var Button = require('./Button');
var Parse = require('parse/react-native');
var lp = [];
var st = [];


class UpdateVehicles extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      errorMessage: "",
      licensePlate: [],
      registeredState: [],
    };
  }

  componentWillMount() {
    var currentUser = Parse.User.current();
    var userJSON = JSON.stringify(currentUser);
    var userinfo = eval ("(" + userJSON + ")");
    this.setState({userEmail: userinfo.email});
    var vehicle = Parse.Object.extend("Vehicle");
    var query = new Parse.Query(vehicle);
    query.equalTo("userEmail", userinfo.email);
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
        this.setState({errorMessage: error.message});
      }
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <Text
          style={[styles.titleContainer, {marginBottom: 30}]}>
          Edit your vehicles </Text>
          {this.displayCars()}
        <Text style={styles.errorColor}>{this.state.errorMessage}</Text>
        <Button text="Submit" onPress={this.editVehicles.bind(this)}/>
        <Button text="Back" onPress={this.exitScreen.bind(this)}/>
      </View>
    );
  }


  displayCars() {
    lp=this.state.licensePlate;
    st=this.state.registeredState;
    return this.state.licensePlate.map((plate,index) => {
        return (<View>
          <Text style={styles.titleContainer}>License plate number: </Text>
          <TextInput
            style = {styles.textInputContainer}
            onChangeText = {(text) => lp[index]=text}
            defaultValue = {this.state.licensePlate[index]}/>
          <Text style = {styles.titleContainer}> State: </Text>
          <TextInput
            style = {styles.textInputContainer}
            onChangeText = {(text) => st[index]=text}
            defaultValue = {this.state.registeredState[index]}/></View>);
      })
  }

  editVehicles() {
    this.setState({
      licensePlate: lp,
      registeredState: st,
      errorMessage: "Saved!"
    });
  }
  exitScreen() {
    console.log(this.state.licensePlate[0] + " " + this.state.registeredState[0])
    console.log(this.state.licensePlate[1] + " " + this.state.registeredState[1])
    this.props.navigator.pop();
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
  errorColor: {
    color: 'red',
    fontFamily: 'Helvetica',
  },
  textInputContainer: {
    padding: 4,
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
    width: 200,
    height: 40,
    fontFamily: 'Helvetica',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
});

module.exports = UpdateVehicles;