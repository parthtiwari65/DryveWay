'use strict';
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
var Button = require('./Button');
var VerifyThings = require('./VerifyThings');
var Parse = require('parse/react-native');
var lp = [];
var st = [];
var oldLP = [];
var oldST = [];

class UpdateVehicles extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      errorMessage: "",
      licensePlate: [],
      registeredState: [],
    };
  }

  componentWillMount() {
    var currentUser = Parse.User.current();
    var userJSON = JSON.stringify(currentUser);
    var userinfo = eval ("(" + userJSON + ")");
    this.setState({username: userinfo.username});
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
            oldLP.push(object.get('licensePlate'));
            oldST.push(object.get('registeredState'));
        }
      },
      error: (error) => {
        this.setState({errorMessage: error.message});
      }
    });
  }

  render() {
    return(
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View>
        <Text
          style={[styles.titleContainer, {marginBottom: 30}]}>
          Edit your vehicles </Text>
        {this.displayCars()}
        <Text style={styles.errorColor}>{this.state.errorMessage}</Text>
        <Button text="Submit" onPress={this.editVehicles.bind(this)}/>
        <Button text="Back" onPress={this.exitScreen.bind(this)}/>
      </View>
      </KeyboardAwareScrollView>
    );
  }

  displayCars() {
    lp=this.state.licensePlate;
    st=this.state.registeredState;
    return this.state.licensePlate.map((plate,index) => {
        return (
          <View key={index}>
          <Text key = {index + " plate"} style={styles.titleContainer}>
          License plate number:
          </Text>
          <TextInput
            maxLength = {7}
            autoCorrect={false}
            autoCapitalize={'characters'}
            key = {plate + " plate"}
            style = {styles.textInputContainer}
            onChangeText = {(text) => lp[index]=text}
            defaultValue = {this.state.licensePlate[index]}/>
          <Text key={index + " state"} style={styles.titleContainer}>
          State:
          </Text>
          <Text style={styles.warningMessage}>2-letter state code</Text>
          <TextInput
            maxLength = {2}
            autoCorrect={false}
            autoCapitalize={'characters'}
            key = {this.state.registeredState[index] + " state"}
            style = {styles.textInputContainer}
            onChangeText = {(text) => st[index]=text}
            defaultValue = {this.state.registeredState[index]}/></View>);
      })
  }

  editVehicles() {
    this.setState({
      licensePlate: lp,
      registeredState: st,
      errorMessage: "Saving...",
    });
    for (var i = 0; i < this.state.licensePlate.length; i++) {

      var obj = new VerifyThings();
      var ver = obj.verifyPlateNumber(this.state.licensePlate[i]);
      if( ver!= "correct") {
        this.setState({
          errorMessage: ver
        });
        return;
      }
      var ver = obj.verifyState(this.state.registeredState[i]);
      if( ver!= "correct") {
        this.setState({
          errorMessage: ver
        });
        return;
      }
    }

    for (var i = 0; i < this.state.licensePlate.length; i++) {
      var vehicle = Parse.Object.extend("Vehicle");
      var query = new Parse.Query(vehicle);
      query.equalTo("username", this.state.username);
      query.equalTo("licensePlate", oldLP[i]);
      query.equalTo("registeredState", oldST[i]);
      var ctr = 0 ;
      query.first({
        success: (results) => {
          results.save(null, {
            success: (obj) => {
              obj.set("licensePlate",this.state.licensePlate[ctr]);
              obj.set("registeredState",this.state.registeredState[ctr]);
              ctr = ctr+1;
              obj.save();
              this.setState({errorMessage: "Done!"});
            }
          });
        }
      });
    }
  }
  exitScreen() {
    this.props.navigator.pop();
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Helvetica',
  },
  textContainer: {
    borderWidth: 2,
    borderColor: 'green',
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
  warningMessage: {
    color: '#2f4f4f',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontSize: 12,
  },
});

module.exports = UpdateVehicles;
