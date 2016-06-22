'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight
} from 'react-native';
var sendbird = require('sendbird');
var PULLDOWN_DISTANCE = 40;
var _isMounted = true;
class Messages extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      channelList: [],
      dataSource: ds.cloneWithRows([]),
      channelName: ''
    };
  }
  componentWillUnmount() {
    _isMounted = false;
  }
  componentWillMount() {
    _isMounted = true;
      sendbird.connect({
        successFunc: (data) => {
          this.getChannelList();
        },
        errorFunc: (status, error) => {
          console.log(status, error);
        }
      });
      sendbird.events.onMessagingChannelUpdateReceived = (obj) => {
        var _add = true;
        this.state.channelList.forEach((channel, index) => {
          if (channel.channel_url == obj.channel.channel_url) {
              _add = false;
              var _channelList = this.state.channelList;
              _channelList[index] = this.makeChannelListView(obj);
              if(_isMounted) {
                this.setState({channelList: _channelList}, () => {
                  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                  this.setState({dataSource: ds.cloneWithRows(this.state.channelList)}, () => {return;});
                });
              }
          }
        });

        if (_add) {
            var _channelList = this.state.channelList;
            _channelList.push(this.makeChannelListView(obj));
            if(_isMounted) {
              this.setState({channelList: _channelList}, () => {
                var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({dataSource: ds.cloneWithRows(this.state.channelList)});
              });
            }
        }
      }
  }
  onChannelPress(url) {
    sendbird.joinMessagingChannel(
      url,
      {
        successFunc : (data) => {
          sendbird.connect({
            successFunc: (data) => {
              this.props.navigator.push({ name: 'chat' });
            },
            errorFunc: (status, error) => {
              console.log(status, error);
            }
          });
        },
        errorFunc: (status, error) => {
          console.log(status, error);
        }
      }
    );
  }
  getChannelList() {
    sendbird.getMessagingChannelList({
      successFunc : (data) => {
        var _channelLst = [];
        data.channels.forEach((item, index) => { _channelLst.push(this.makeChannelListView(item)); });
        if(_isMounted) {
          this.setState({channelList: this.state.channelList.concat(_channelLst)}, () => {
            this.setState({dataSource: this.state.dataSource.cloneWithRows(this.state.channelList)});
          });
        }
      },
      errorFunc: (status, error) => {
        console.log(status, error);
      }
    });
  }
  makeChannelListView(channel) {
  var _memberList = '';
  channel.members.forEach((member, index) => {
    if (index < 1) {
      _memberList += member.name + ', ';
    } else if (index == 1) {
      _memberList += member.name;
    } else if (index == 2) {
      _memberList += ' ...';
    }
  });

  return {
    channel_url: channel.channel.channel_url,
    cover_img_url: channel.channel.cover_img_url,
    member_count: channel.channel.member_count,
    member_list: _memberList,
    member_image: channel.members[0].image,
    unread_message_count: channel.unread_message_count,
    last_message: this.getLastMessage(channel.last_message)
  };
}
getLastMessage(msg) {
  var _last_message = '';
  if (typeof msg == 'object' && msg.message.length) {
    _last_message = msg.message;
    if (_last_message.length > 30) {
      _last_message = _last_message.substring(0, 29) + '...';
    }
  }
  return _last_message;
}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.topContainerText}>Received Messages</Text>
        </View>
        <View style={styles.listContainer}>
          <ListView
            enableEmptySections
            automaticallyAdjustContentInsets={false}
            contentInset={{bottom:49}}
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <TouchableHighlight onPress={() => this.onChannelPress(rowData.channel_url)}>
                <View style={styles.listItem}>
                  <View style={styles.listIcon}>
                    <Image style={styles.channelIcon} source={{uri: rowData.member_image}} />
                  </View>
                  <View style={styles.listInfo}>
                    <Text style={styles.titleLabel}>{rowData.member_list}</Text>
                    <Text style={styles.memberLabel}>{rowData.last_message}</Text>
                  </View>
                  <View style={styles.listUnread}>
                    <Text style={styles.unreadLabel}>unread: {rowData.unread_message_count}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            }
          />
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
    backgroundColor: '#F5FCFF',
  },
  listContainer: {
    flex: 12,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    borderBottomWidth: 0.5,
    borderColor: '#D0DBE4',
    padding: 5
  },
  listIcon: {
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingRight: 15
  },
  channelIcon: {
    width: 30,
    height: 30
  },
  listInfo: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  titleLabel: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Helvetica',
    color: '#60768b',
  },
  memberLabel: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Helvetica',
    color: '#abb8c4',
  },
  listUnread: {
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  unreadLabel: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Helvetica',
    fontWeight: '200'
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 20,
    borderBottomColor: 'blue',
    borderBottomWidth: 0.5,
  },
  topContainerText: {
    fontSize: 20,
    alignSelf: 'stretch',
    fontFamily: 'Helvetica',
    textAlign: 'center',
  },
});

module.exports = Messages;
