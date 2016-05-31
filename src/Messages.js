'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class Messages extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { page } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Messages page!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

module.exports = Messages;
