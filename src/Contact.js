'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
var Button = require('./Button');
var Parse = require('parse/react-native');
var sendbird = require('sendbird');
var appId = '6662716B-F212-4E6A-873F-7C676F7ADC4E';
//6662716B-F212-4E6A-873F-7C676F7ADC4E
//A7A2672C-AD11-11E4-8DAA-0A18B21C2D82
class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carOwnerUserName: "",
      carNumber: "",
      carState: "",
      successMessage: "",
      currentUserName: "",
      errorMessage: "",
    };
  }
  componentWillMount() {
    var currentUser = Parse.User.current();
    var userJSON = JSON.stringify(currentUser);
    var userinfo = eval ("(" + userJSON + ")");
    this.setState({currentUserName: userinfo.username});
    console.log("User:" + userinfo.username)
    sendbird.init({
      app_id: appId,
      guest_id: userinfo.username,
      user_name: userinfo.username,
      image_url: "",
      access_token: "",
      successFunc: (data) => {
        this.setState({errorMessage: "Messaging registered, logging in.."})
        console.log("chat registered")
      },
      errorFunc: (status, error) => {
        this.setState({errorMessage: "Failed to register messaging, try again later.."})
        return;
      }
    });
  }

  render() {
    const { page } = this.state;
    if(this.state.successMessage == "Yay! This vehicle is registered with us :D") {
      var contactButton = <Button text="Contact owner" onPress={this.onContactPress.bind(this)}/>;
    }

    return (
      <View style={styles.addCarView}>
          <Text
            style={[styles.titleContainer, {marginBottom: 30}]}>
            Want to contact a vehicle owner?</Text>
            <Text style={styles.titleContainer}> License plate number:</Text>
                <TextInput
                 style={styles.textInputContainer}
                 autoCapitalize={'characters'}
                 maxLength = {7}
                 onChangeText={(text) => this.setState({carNumber: text})}
                 value={this.state.carNumber}/>
            <Text style={styles.titleContainer}> State: </Text>
                <TextInput
                  style={styles.textInputContainer}
                  autoCapitalize={'characters'}
                  maxLength = {2}
                  onChangeText={(text) => this.setState({carState: text})}
                  value={this.state.carState}/>
            <Text style={styles.succesMessageStyle}>{this.state.successMessage}</Text>
            <Button text="Check availability" onPress={this.onCheckPress.bind(this)}/>
            {contactButton}
        </View>
    );
  }

  onContactPress() {
    var guestIds =[];
    guestIds.push(this.state.currentUserName);
    guestIds.push(this.state.carOwnerUserName);
    sendbird.startMessaging(
      guestIds,
      {
        "successFunc" : (data) => {
          console.log("1. Success:"+ data);
          sendbird.connect({
            "successFunc" : (data) => {
              console.log("2. Success:" + data);
              // do something
                this.props.navigator.push({name: 'chat'});
              },
              "errorFunc": (status, error) => {
                console.log(status, error);
                // do something
              }
          });
          // do something
        },
        "errorFunc": (status, error) => {
            console.log(status, error);
            // do something
        }
      }
    );
  }

  verifyPlateNumber(plateNumber){
    if (plateNumber.trim().length == 0) {
      return 'Please enter plate number';
    }
    var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    if (regExp.test(plateNumber)) {
        return 'Please only alphanumeric characters in plate number';
    }
    return 'correct';
  }
  verifyState(state){
    if (state.trim().length == 0) {
      return 'Please enter state';
    }
    var regExpState = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"0-9]/gi
    if (regExpState.test(state)) {
        return 'Please only letters in state';
      }
    return 'correct';
  }

  onCheckPress() {
    this.setState({
           successMessage: "Searching..."
      });
      var ver = this.verifyPlateNumber(this.state.carNumber);
      if( ver!= "correct") {
        this.setState({
          successMessage: ver
        });
        return;
      }
      var ver = this.verifyState(this.state.carState);
      if( ver!= "correct") {
        this.setState({
          successMessage: ver
        });
        return;
      }

    var vehicle = Parse.Object.extend("Vehicle");
    var query = new Parse.Query(vehicle);
    query.equalTo("licensePlate", this.state.carNumber);
    query.equalTo("registeredState", this.state.carState);
    query.find({
      success: (results) => {
        if(results.length>0) {
          var object = results[0];
          this.setState({
                 carOwnerUserName: object.get('username'),
                 successMessage: "Yay! This vehicle is registered with us :D"
            });
        }
        else {
          this.setState({
                 successMessage: "Oops! This vehicle is NOT registered with us :[ "
            });
        }
      },
      error: (error) => {
        this.setState({
               successMessage: "Something went wrong, we're fixing it! :[ )"
          });
      }
    });
  }
}

const styles = StyleSheet.create({
  addCarView: {
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    fontSize: 20,
    fontFamily: 'Helvetica',
  },
  succesMessageStyle: {
    fontSize: 15,
    fontFamily: 'Helvetica',
    marginLeft: 10,
    marginRight: 10,
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

module.exports = Contact;
