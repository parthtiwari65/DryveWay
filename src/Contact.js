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
      carOwnerEmail: "",
      carNumber: "",
      carState: "",
      successMessage: "",
      currentUserEmail: "",
      errorMessage: "",
    };
  }
  componentWillMount() {
    var currentUser = Parse.User.current();
    var userJSON = JSON.stringify(currentUser);
    var userinfo = eval ("(" + userJSON + ")");
    this.setState({currentUserEmail: userinfo.email});
    console.log("User:" + userinfo.email)
    sendbird.init({
      app_id: appId,
      guest_id: userinfo.email,
      user_name: userinfo.email,
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
                 onChangeText={(text) => this.setState({carNumber: text})}
                 value={this.state.carNumber}/>
            <Text style={styles.titleContainer}> State: </Text>
                <TextInput
                  style={styles.textInputContainer}
                  onChangeText={(text) => this.setState({carState: text})}
                  value={this.state.carState}/>
            <Text style={styles.succesMessageStyle}>{this.state.successMessage}</Text>
            <Button text="Check availability" onPress={this.onCheckPress.bind(this)}/>
            {contactButton}
        </View>
    );
  }

  onBackPress() {
    this.props.navigator.pop();
  }
  onSendPress() {
    console.log(this.state.message);
    this.setState({message: ''});
  }

  onContactPress() {
    var guestIds =[];
    guestIds.push(this.state.currentUserEmail);
    guestIds.push(this.state.carOwnerEmail);
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
              "errorFunc": function(status, error) {
                console.log(status, error);
                // do something
              }
          });
          // do something
        },
        "errorFunc": function(status, error) {
            console.log(status, error);
            // do something
        }
      }
    );
  }

  onCheckPress() {
    this.setState({
           successMessage: "Searching..."
      });
    var vehicle = Parse.Object.extend("Vehicle");
    var query = new Parse.Query(vehicle);
    query.equalTo("licensePlate", this.state.carNumber);
    query.equalTo("registeredState", this.state.carState);
    query.find({
      success: (results) => {
        if(results.length>0) {
          var object = results[0];
          this.setState({
                 carOwnerEmail: object.get('userEmail'),
                 successMessage: "Yay! This vehicle is registered with us :D"
            });
            console.log(object.get('userEmail'));
        }
        else {
          this.setState({
                 successMessage: "Oops! This vehicle is NOT registered with us :[ "
            });
        }
      },
      error: (error) => {
        this.setState({
               successMessage: "Something went horrible wrong! :[ )"
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
