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

class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carNumber: "",
      carState: "",
      successMessage: "",
    };
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

  onContactPress() {

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
          this.setState({
                 successMessage: "Yay! This vehicle is registered with us \:D/"
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
