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

class CarReg extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carNumber1: "",
      carState1: "",
      carNumber2: "",
      carState2: "",
      errorMessage: ""
    };
  }

  render() {
    const { page } = this.state;
    return (
      <View style={styles.container}>
        <Text
          style={[styles.titleContainer, {marginBottom: 30}]}>
          Please register your cars here </Text>
        <Text style={styles.titleContainer}> License plate number: </Text>
        <TextInput
          style={styles.textInputContainer}
          onChangeText={(text) => this.setState({carNumber1: text})}
          value={this.state.carNumber1}/>
        <Text style={styles.titleContainer}> State: </Text>
        <TextInput
          style={styles.textInputContainer}
          onChangeText={(text) => this.setState({carState1: text})}
          value={this.state.carState1}/>
        <Text>{this.state.errorMessage}</Text>
        <Button text="Add car" onPress={this.onAddCarPress.bind(this)}/>
        <Button text="Submit" onPress={this.onSubmitPress.bind(this)}/>
      </View>
    );
  }
  onSubmitPress() {
    this.props.navigator.push({name: 'main'});
  }
  onAddCarPress() {

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
});

module.exports = CarReg;
