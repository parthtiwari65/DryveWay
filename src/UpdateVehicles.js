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

class UpdateVehicles extends Component {

  constructor(props) {
    super(props);
  }

  render(){
    return(
      <View style={styles.container}>
        <Text> Test </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  }
});

module.exports = UpdateVehicles;
