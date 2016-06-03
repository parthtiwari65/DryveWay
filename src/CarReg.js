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
      carCountry1: "",
      carNumber2: "",
      carState2: "",
      carCountry1: "",
      errorMessage: "",
      carEntry: false,
    };
  }

  render() {
    const { page } = this.state;
    var carFields =<View/>;
    if(this.state.carEntry) {
        carFields =<View style={styles.addCarView}>
                      <Text style={styles.titleContainer}> License plate number:</Text>
                        <TextInput
                          style={styles.textInputContainer}
                          onChangeText={(text) => this.setState({carNumber2: text})}
                          value={this.state.carNumber2}/>
                      <Text style={styles.titleContainer}> State: </Text>
                        <TextInput
                          style={styles.textInputContainer}
                          onChangeText={(text) => this.setState({carState2: text})}
                          value={this.state.carState2}/>
                          <TextInput
                              style={styles.textInputContainer}
                              onChangeText={(text) => this.setState({carCountry2: text})}
                              value={this.state.carCountry2}/>
                    </View>;
      } else {
        carFields = <View/>;
      }


    return (
      <View style={styles.container}>
        <Text
          style={[styles.titleContainer, {marginBottom: 30}]}>
          Please register your vehicle, you can add up-to 2 cars </Text>
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
        <TextInput
            style={styles.textInputContainer}
            onChangeText={(text) => this.setState({carCountry1: text})}
            value={this.state.carCountry1}/>
        {carFields}
        <Text>{this.state.errorMessage}</Text>
        <Button text="Add another vehicle" onPress={this.onAddCarPress.bind(this)}/>
        <Button text="Submit" onPress={this.onSubmitPress.bind(this)}/>
        <Button text="I don't have a vehicle" onPress={this.onNoCarPress.bind(this)}/>
      </View>
    );
  }
  onAddCarPress() {
    this.setState({carEntry: true})
  }
  onSubmitPress() {
    if(this.state.carEntry) {
      var Vehicle = Parse.Object.extend("Vehicle");
      var vehicle = new Vehicle();
      vehicle.set("licensePlate", this.state.carNumber1);
      vehicle.set("registeredState", this.state.carState1);
      vehicle.set("registeredCountry", this.state.carCountry1);

      vehicle.save(null, {
        success: (gameScore) => {
          // Execute any logic that should take place after the object is saved.
          alert('Car registered with objectId: ' + vehicle.id);
          this.props.navigator.push({name: 'main'});
        },
        error: (gameScore, error) => {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          alert('Failed to create new object, with error code: ' + error.message);
        }
      });
    }
    else {
      var Vehicle = Parse.Object.extend("Vehicle");
      var vehicle = new Vehicle();
      vehicle.set("licensePlate", this.state.carNumber1);
      vehicle.set("registeredState", this.state.carState1);
      vehicle.set("registeredCountry", this.state.carCountry1);

      vehicle.save(null, {
        success: (gameScore) => {
        },
        error: (gameScore, error) => {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          alert('Failed to create new object, with error code: ' + error.message);
        }
      });

      var Vehicle = Parse.Object.extend("Vehicle");
      var vehicle = new Vehicle();
      vehicle.set("licensePlate", this.state.carNumber2);
      vehicle.set("registeredState", this.state.carState2);
      vehicle.set("registeredCountry", this.state.carCountry2);

      vehicle.save(null, {
        success: (gameScore) => {
          // Execute any logic that should take place after the object is saved.
          this.props.navigator.push({name: 'main'});
        },
        error: (gameScore, error) => {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          alert('Failed to create new object, with error code: ' + error.message);
        }
      });

    }

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
