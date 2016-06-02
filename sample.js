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
      errorMessage: "",
      carEntry: <View/>,
    };
  }

  render() {
    const { page } = this.state;
    return (
      <View style={styles.container}>
        <Text
          style={[styles.titleContainer, {marginBottom: 30}]}>
          Please register your cars, you can add up-to 2 cars </Text>
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
        {this.state.carEntry}
        <Text>{this.state.errorMessage}</Text>
        <Button text="Add another car" onPress={this.onAddCarPress.bind(this)}/>
        <Button text="Submit" onPress={this.onSubmitPress.bind(this)}/>
        <Button text="I don't have a car" onPress={this.onNoCarPress.bind(this)}/>
      </View>
    );
  }
  onAddCarPress() {
    this.setState({carEntry:
      <View style={styles.addCarView}>
          <Text style={styles.titleContainer}> License plate number: </Text>
          <TextInput
            style={styles.textInputContainer}
            onChangeText={(text) => this.setState({carNumber2: text})}
            value={this.state.carNumber2}/>
          <Text style={styles.titleContainer}> State: </Text>
          <TextInput
            style={styles.textInputContainer}
            onChangeText={(text) => this.setState({carState2: text})}
            value={this.state.carState2}/>
      </View>
    })
  }
  onSubmitPress() {
    this.props.navigator.push({name: 'main'});
  }
  onNoCarPress() {
    this.props.navigator.push({name: 'main'});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  addCarView: {
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
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
