'use strict';
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';

var sendbird = require('sendbird');
var windowSize = Dimensions.get('window');

class Chat extends Component {

  constructor(props) {
    super(props);
      this.state = {
        message: '',
         messageList: []
      };
  }
  componentWillMount() {
    sendbird.events.onMessageReceived = (obj) => {
      this.setState({messageList: this.state.messageList.concat([obj])});
    };
    this.getMessages();
  }
  getMessages() {
    sendbird.getMessageLoadMore({
      limit: 100,
      successFunc: (data) => {
        var _messageList = [];
        data.messages.reverse().forEach(function(msg, index){
          if(sendbird.isMessage(msg.cmd)) {
            _messageList.push(msg.payload);
          }
        });
        this.setState({ messageList: _messageList.concat(this.state.messageList) });
      },
      errorFunc: (status, error) => {
        console.log(status, error);
      }
    });
  }
  onBackPress() {
    this.props.navigator.pop();
  }
  onSendPress() {
    sendbird.message(this.state.message);
    this.setState({message: ''});
  }
  render() {
    var list = this.state.messageList.map((item, index) => {
      return (
        <View
          style={styles.messageContainer}
          key={index}
          >
          <Text style={this.nameLabel}>
            {item.user.name}
            <Text style={styles.messageLabel}> : {item.message}</Text>
          </Text>
        </View>
      );
    });
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableHighlight
            underlayColor={'#4e4273'}
            onPress={this.onBackPress.bind(this)}
            style={{marginLeft: 15}}
            >
            <Text style={{color: '#000000'}}>&lt; Back</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.chatContainer}>
          <ScrollView
            ref={(c) => this._scrollView = c}
            onScroll={this.handleScroll}
            scrollEventThrottle={16}
            onContentSizeChange={(e) => {}}
          >
          {list}
          </ScrollView>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.textContainer}>
            <TextInput
              style={styles.input}
              value={this.state.message}
              onChangeText={(text) => this.setState({message: text})}
              />
          </View>
          <View style={styles.sendContainer}>
            <TouchableHighlight
              underlayColor={'#4e4273'}
              onPress={this.onSendPress.bind(this)}
              >
              <Text style={styles.sendLabel}>SEND</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: '#ffffff'
    },
    topContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      paddingTop: 20,
    },
    chatContainer: {
      flex: 11,
      justifyContent: 'center',
      alignItems: 'stretch'
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center'
    },
    sendContainer: {
      justifyContent: 'flex-end',
      paddingRight: 10
    },
    sendLabel: {
      color: '#000000',
      fontSize: 15,
      fontFamily: 'Helvetica',
    },
    input: {
      width: windowSize.width - 70,
      color: '#555555',
      paddingRight: 10,
      paddingLeft: 10,
      paddingTop: 5,
      height: 32,
      borderColor: '#6E5BAA',
      borderWidth: 1,
      borderRadius: 2,
      alignSelf: 'center',
      backgroundColor: '#ffffff'
    },
  });

module.exports = Chat;
