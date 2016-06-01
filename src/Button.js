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
    marginTop: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
  },
  textContainer: {
    fontFamily: 'Helvetica',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    flex:1,
    fontSize: 20,
  }
});

module.exports = Button;
