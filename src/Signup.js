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

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      errorMessage: ""
    };
  }

  render() {
    const { page } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.titleContainer}> Please register here </Text>
        <Text style={styles.titleContainer}> Email: </Text>
        <TextInput
          style={styles.textInputContainer}
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email}/>
        <Text style={styles.titleContainer}> Username: </Text>
        <TextInput
          style={styles.textInputContainer}
          onChangeText={(text) => this.setState({username: text})}
          value={this.state.username}/>
        <Text style={styles.titleContainer}> Password: </Text>
        <TextInput
          style={styles.textInputContainer}
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          secureTextEntry={true}/>
        <Text style={styles.titleContainer}> Confirm password: </Text>
        <TextInput
            style={styles.textInputContainer}
            onChangeText={(text) => this.setState({confirmPassword: text})}
            value={this.state.confirmPassword}
            secureTextEntry={true}/>
        <Text style={styles.errorColor}>{this.state.errorMessage}</Text>
        <Button text="Submit" onPress={this.onSubmitPress.bind(this)}/>
        <Button text="I have an account"
                  onPress={this.onAlreadyPress.bind(this)}/>
      </View>
    );
  }

  onSubmitPress() {
    this.setState({errorMessage: "Loading..."})
    if(this.state.password != this.state.confirmPassword) {
      this.setState({errorMessage: "Sorry, passwords don't match"})
      return
    }
    var user = new Parse.User();
    user.set("username", this.state.username);
    user.set("password", this.state.password);
    user.set("email", this.state.email);

    user.signUp(null, {
      success: (user) => {
        this.setState({errorMessage: ""});
        this.props.navigator.push({name: 'carReg'});
      },
      error: (user, error) => {
        this.setState({errorMessage: error.message}).bind(this);
      }
    });
  }
  onAlreadyPress(){
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
  errorColor: {
    color: 'red',
    fontFamily: 'Helvetica',
  },
});

module.exports = Signup;
