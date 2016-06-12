'use strtict';
import React, {Component} from 'react';
import {
  View,
  Navigator,
  StyleSheet,
  Text,
} from 'react-native';

var Profile = require('./Profile');
var Contact = require('./Contact');
var UpdateVehicles = require('./UpdateVehicles');

var ROUTES = {
  'contact': Contact,
  'profile': Profile,
  'updateVehicles': UpdateVehicles,
};

class ProfileBase extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View>
      <Text> Other text </Text>
      <Navigator
        style={styles.container}
        initialRoute={{name:'profile'}}
        renderScene={this.renderScene.bind(this)}/>
      </View>
    );
  }
  renderScene(route, navigator) {
    var Mycomponent = ROUTES[route.name];
    return <Mycomponent route={route} navigator={navigator}/>;
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

module.exports = ProfileBase;
