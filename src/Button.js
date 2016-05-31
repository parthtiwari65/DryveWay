/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

class Button extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight
        style={styles.container}
        onPress={this.props.onPress}
        underlayColor ='gray'>
      <Text style={styles.textContainer}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingBottom: 10,
    paddingTop: 10,
  },
  textContainer: {
    fontFamily: 'Helvetica',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10,
    width: 120,
    height: 40,
  }
});

module.exports = Button;
