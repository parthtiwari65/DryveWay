//
//  SendBird.h
//  SendBirdFramework
//
//  Created by SendBird Developers on 2015. 3. 2. in San Francisco, CA.
//  Copyright (c) 2015 SENDBIRD.COM. All rights reserved.
//

#import <Foundation/Foundation.h>
#include "TargetConditionals.h"
#if TARGET_OS_IOS
#import <UIKit/UIKit.h>
#import <AdSupport/AdSupport.h>
#endif
#import "SendBirdClient.h"
#import "SendBirdFileInfo.h"
#import "SendBirdChannelListQuery.h"
#import "SendBirdAPIClient.h"
#import "SendBirdBroadcastMessage.h"
#import "SendBirdMessagingChannel.h"
#import "SendBirdReadStatus.h"
#import "SendBirdTypeStatus.h"
#import "SendBirdMessagingChannelListQuery.h"
#import "SendBirdMemberListQuery.h"
#import "SendBirdMessageListQuery.h"
#import "SendBirdSystemMessage.h"
#import "SendBirdWSClient.h"
#import "SendBirdMessagingUnreadCountQuery.h"
#import "SendBirdMention.h"
#import "SendBirdStructuredMessage.h"
#import "SendBirdBlockedUser.h"
#import "SendBirdUserListQuery.h"
#import "SendBirdOnlineMemberCountQuery.h"
#import "SendBirdChannelMetaDataQuery.h"
#import "SendBirdChannelMetaCounterQuery.h"
#import "SendBirdChannelMetaDataQuery.h"
#import "SendBirdChannelMetaCounterQuery.h"
#import "SendBirdMemberCountQuery.h"
#import "SendBirdSystemEvent.h"
#import "SendBirdAppUser.h"

#define kSendBirdInitWithIDFA 0
#define kSendBirdInitWithIDFV 1

typedef enum {
    SendBirdDataTypeNone,
//    SendBirdDataTypeJoin = 0,
//    SendBirdDataTypeLoadMore = 1,
//    SendBirdDataTypeLoadNext,
//    SendBirdDataTypeLoadPrev,
//    SendBirdDataTypeLoadWithCursor,
    SendBirdDataTypeMessage,
    SendBirdDataTypeSystemMessage,
    SendBirdDataTypeBroadcastMessage,
    SendBirdDataTypeFileLink,
    SendBirdDataTypeReadStatus,
    SendBirdDataTypeStartTyping,
    SendBirdDataTypeEndTyping,
    SendBirdDataTypeStructuredMessage,
} SendBirdDataType;

@class SendBirdChannelListQuery;
@class SendBirdClient;
@class SendBirdMessagingChannelListQuery;
@class SendBirdMemberListQuery;
@class SendBirdFileInfo;
@class SendBirdFileLink;
@class SendBirdMessagingUnreadCountQuery;
@class SendBirdUserListQuery;
@class SendBirdOnlineMemberCountQuery;
@class SendBirdChannelMetaDataQuery;
@class SendBirdChannelMetaCounterQuery;
@class SendBirdMemberCountQuery;
@class SendBirdSystemEvent;

/**
 *  `SendBird` is the main class of [SendBird](http://sendBird.com). This class offers connection to SendBird platform, login, setting event callback blocks, message transfers, and others. This class will be defined as a Single Instance in an iOS app. The typical usage order is as the following:
 *
 *  1. Initializing(`initWith...`)
 *  1. Setting User Information(`loginWith...`)
 *  1. Setting Event Callback Blocks(`setEventHandler...`)
 *  1. Setting Channels(`join...`)
 *  1. Connecting(`connectWith...`)
 *  1. Message Transfering(`sendMessage...`)
 */
@interface SendBird : NSObject

/**
 *  Returns current version of SendBird iOS Framework
 *
 *  @return Current SendBird iOS Framework version
 */
+ (NSString *) VERSION;

+ (BOOL) SENDBIRD_LOG_DEBUG;

+ (BOOL) SB_DEBUG_MODE;

+ (NSString *) WS_HOST DEPRECATED_ATTRIBUTE;

+ (NSString *) API_HOST DEPRECATED_ATTRIBUTE;

+ (NSString *) DEBUG_WS_HOST;

+ (NSString *) DEBUG_API_HOST;

+ (NSString *) getWSHost;

+ (NSString *) getAPIHost;

+ (void) setWSHost:(NSString *)newWSHost;

+ (void) setAPIHost:(NSString *)newAPIHost;

+ (NSTimeInterval) getHostUrlLastUpdatedAt;

+ (void) setHostUrlLastUpdatedAt:(NSTimeInterval)updatedAt;

+ (void) setRoutingHostUrl:(NSString *)url;

/**
 *  Instance of [`SendBird`](./SendBird.html) class
 *
 *  @return Instance of SendBird class.
 */
+ (SendBird *) sharedInstance;

/**
 *  Returns `SendBirdBlockedUser` instance which is used for managing the list of blocked users. `SendBirdBlockedUser` instance updates automatically when connected to SendBird server.
 *
 *  @return `SendBirdBlockedUser` instance.
 */
+ (SendBirdBlockedUser *) sendBirdBlockedUser;

/**
 *  Set a new `SendBirdBlockedUser`. `SendBirdBlockedUser` instance updates automatically, so modifying using this method may cause problems. Do not call this method directly.
 *
 *  @param newSendBirdBlockedUser New `SendBirdBlockedUser` instance
 */
+ (void) setSendBirdBlockedUser:(SendBirdBlockedUser *)newSendBirdBlockedUser;

/**
 *  SendBird Application ID set using initialization method([`initAppId:`](#//api/name/initAppId:), [`igawInitUserId:andAppId:`](#//api/name/igawInitUserId:andAppId:), [`igawInitAppId:`](#//api/name/igawInitAppId:))
 */
@property (retain) NSString *appId;

@property BOOL connected DEPRECATED_ATTRIBUTE;

@property BOOL mLoginRequired;

@property (retain) NSOperationQueue *taskQueue;

@property (retain) NSOperationQueue *imageTaskQueue;

@property (retain) NSString *deviceToken;

- (id) initWithAppId:(NSString *)appId;

+ (void) initWithAppKey:(NSString *)appKey;

+ (void) initByIDFVWithBundle:(NSBundle *)bundle andAppId:(NSString *)appId DEPRECATED_ATTRIBUTE;

+ (void) initByIDFAWithBundle:(NSBundle *)bundle andAppId:(NSString *)appId DEPRECATED_ATTRIBUTE;

+ (void) initUserId:(NSString *)userId withBundle:(NSBundle *)bundle andAppId:(NSString *)appId DEPRECATED_ATTRIBUTE;

+ (void) initUserId:(NSString *)userId andAppId:(NSString *)appId DEPRECATED_ATTRIBUTE;

+ (void) initUserId:(NSString *)userId andAppId:(NSString *)appId selectDeviceId:(int)deviceIdType DEPRECATED_ATTRIBUTE;

/**
 *  Initialize SendBird instance using Application ID
 *
 *  @param appId Application ID. Application ID. The value for your app is found on [SendBird Dashboard](https://dashboard.sendBird.com/)
 */
+ (void) initAppId:(NSString *)appId;

+ (void) initAppId:(NSString *)appId selectDeviceId:(int)deviceIdType DEPRECATED_ATTRIBUTE;

/**
 *  Initialize SendBird instance using Application ID and device ID
 *
 *  @param appId    Application ID. Application ID. The value for your app is found on [SendBird Dashboard](https://dashboard.sendBird.com/)
 *  @param deviceId Device ID. See [IDFA](https://developer.apple.com/library/prerelease/ios/documentation/AdSupport/Reference/ASIdentifierManager_Ref/#//apple_ref/occ/instp/ASIdentifierManager/advertisingIdentifier) or [IDFV](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIDevice_Class/#//apple_ref/occ/instp/UIDevice/identifierForVendor)
 */
+ (void) initAppId:(NSString *)appId withDeviceId:(NSString *)deviceId ;

+ (void) igawInitByIDFVWithBundle:(NSBundle *)bundle andAppId:(NSString *)appId DEPRECATED_ATTRIBUTE;

+ (void) igawInitByIDFAWithBundle:(NSBundle *)bundle andAppId:(NSString *)appId DEPRECATED_ATTRIBUTE;

+ (void) igawInitUserId:(NSString *)userId withBundle:(NSBundle *)bundle andAppId:(NSString *)appId DEPRECATED_ATTRIBUTE;

+ (void) igawInitByIDFVWithAppId:(NSString *)appId DEPRECATED_ATTRIBUTE;

+ (void) igawInitByIDFAWithAppId:(NSString *)appId DEPRECATED_ATTRIBUTE;

+ (void) igawInitUserId:(NSString *)userId andAppId:(NSString *)appId DEPRECATED_ATTRIBUTE;

+ (void) igawInitUserId:(NSString *)userId andAppId:(NSString *)appId selectDeviceId:(int)deviceIdType DEPRECATED_ATTRIBUTE;

/**
 *  Initialize SendBird instance using Application ID (IGAWorks only)
 *
 *  @param appId Application ID. The value for your app is found on [IGAWorks' SendBird Dashboard](http://www.igaworks.com/)
 */
+ (void) igawInitAppId:(NSString *)appId;

+ (void) igawInitAppId:(NSString *)appId selectDeviceId:(int)deviceIdType DEPRECATED_ATTRIBUTE;

/**
 *  Initialize SendBird instance using Application ID and device ID (IGAWorks only)
 *
 *  @param appId Application ID. The value for your app is found on [IGAWorks' SendBird Dashboard](http://www.igaworks.com/)
 *  @param deviceId Device ID. See [IDFA](https://developer.apple.com/library/prerelease/ios/documentation/AdSupport/Reference/ASIdentifierManager_Ref/#//apple_ref/occ/instp/ASIdentifierManager/advertisingIdentifier) or [IDFV](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIDevice_Class/#//apple_ref/occ/instp/UIDevice/identifierForVendor)
 */
+ (void) igawInitAppId:(NSString *)appId withDeviceId:(NSString *)deviceId;

/**
 *  Set a user name used for identification during chat. User name will be displayed during messaging. IDFV value will be assigned to [`guestId`](./SendBirdUser.html#//api/name/guestId)
 *
 *  @param userName User name
 */
+ (void) loginWithUserName:(NSString *)userName;

/**
 *  Set a user name and a profile image used for identification during chat. User name will be displayed during messaging. IDFV value will be assigned to [`guestId`](./SendBirdUser.html#//api/name/guestId)
 *
 *  @param userName User name
 *  @param imageUrl Profile image URL
 */
+ (void) loginWithUserName:(NSString *)userName andUserImageUrl:(NSString *)imageUrl;

/**
 *  (IGAWorks only) Set a User ID used for login. User ID is a unique value assigned to identify a user. IDFV value will be assigned to [`guestId`](./SendBirdUser.html#//api/name/guestId)
 *
 *  @param userId User ID
 */
+ (void) igawLoginWithUserId:(NSString *)userId;

/**
 *  (IGAWorks only) Set a user name used for identification during chat. User name will be displayed during messaging. IDFV value will be assigned to [`guestId`](./SendBirdUser.html#//api/name/guestId)
 *
 *  @param userName User name
 */
+ (void) igawLoginWithUserName:(NSString *)userName;

/**
 *  (IGAWorks only) Set a user name and a profile image used for identification during chat. User name will be displayed during messaging. IDFV value will be assigned to [`guestId`](./SendBirdUser.html#//api/name/guestId)
 *
 *  @param userName User name
 *  @param imageUrl Profile image URL
 */
+ (void) igawLoginWithUserName:(NSString *)userName andUserImageUrl:(NSString *)imageUrl;

/**
 *  (IGAWorks only) Set User ID and access token for login. A correct access token needs to be used in order to connect to the chat servers.
 *
 *  @param userId      User ID
 *  @param accessToken Access token
 */
+ (void) igawLoginWithUserId:(NSString *)userId andAccessToken:(NSString *)accessToken;

/**
 *  (IGAWorks only) Set User ID, user name, profile image, and access token for login. A correct access token needs to be used in order to connect to the chat servers.
 *
 *  @param userId      User ID
 *  @param userName    User name
 *  @param imageUrl    Profile image URL
 *  @param accessToken Access token
 */
+ (void) igawLoginWithUserId:(NSString *)userId andUserName:(NSString *)userName andUserImageUrl:(NSString *)imageUrl andAccessToken:(NSString *)accessToken;

/**
 *  Set User ID and User name for login
 *
 *  @param userId   User ID
 *  @param userName User name
 */
+ (void) loginWithUserId:(NSString *)userId andUserName:(NSString *)userName;

/**
 *  Set User ID, user name, profile image, and access token for login. A correct access token needs to be used in order to connect to the chat servers.
 *
 *  @param userId      User ID
 *  @param userName    User name
 *  @param imageUrl    Profile image URL
 *  @param accessToken Access token
 */
+ (void) loginWithUserId:(NSString *)userId andUserName:(NSString *)userName andUserImageUrl:(NSString *)imageUrl andAccessToken:(NSString *)accessToken;

/**
 *  Join a channel. You can make user join an Open Chat anytime, but you need to add a user to Members in case of Messaging Channels or Group Messaging Channels.
 *
 *  @param channelUrl Channel URL
 */
+ (void) joinChannel:(NSString *)channelUrl;

+ (void) joinMultipleChannels:(NSArray<NSString *> *)channelUrls;

/**
 *  Leave a channel
 *
 *  @param channelUrl Channel URL
 */
+ (void) leaveChannel:(NSString *)channelUrl;

+ (void) leaveMultipleChannels:(NSArray<NSString *> *)channelUrls;

/**
 *  Get current channel URL
 *
 *  @return Channel URL
 */
+ (NSString *) getChannelUrl;

/**
 *  Get the [`guestId`](./SendBirdUser.html#//api/name/guestId) of the current user
 *
 *  @return User ID
 */
+ (NSString *) getUserId;

/**
 *  Get the user name of the current user
 *
 *  @return User name
 */
+ (NSString *) getUserName;

/**
 *  Set callback blocks for events.
 *
 *  @param connect                  Calls when connection is made to the chat server. Occurs when [`connect`](./SendBird.html#//api/name/connect) or [`connectWithMessageTs:`](./SendBird.html#//api/name/connectWithMessageTs:) is used
 *  @param error                    Calls when an error occurs
 *  @param channelLeft              Calls when the user leaves a channel. Occurs after [`leaveChannel:`](./SendBird.html#//api/name/leaveChannel:) has been called.
 *  @param messageReceived          Calls when new message is received. Occurs when a user sends a message using [`sendMessage:`](./SendBird.html#//api/name/sendMessage:), [`sendMessage:withTempId:`](./SendBird.html#//api/name/sendMessage:withTempId:), [`sendMessage:withData:`](./SendBird.html#//api/name/sendMessage:withData:),  [`sendMessage:withData:andTempId:`](./SendBird.html#//api/name/sendMessage:withData:andTempId:), [`sendMessage:withData:andTempId:mentionedUserIds:`](./SendBird.html#//api/name/sendMessage:withData:andTempId:mentionedUserIds:)
 *  @param systemMessageReceived    Calls when system message is received
 *  @param broadcastMessageReceived Calls when broadcasted message is received
 *  @param fileReceived             Calls when file is received. Occurs when a user sends a message using [`sendFile:`](./SendBird.html#//api/name/sendFile:)
 *  @param messagingStarted         Calls when a new conversation begins. Occurs when [`inviteMessagingWithChannelUrl:andUserId:`](./SendBird.html#//api/name/inviteMessagingWithChannelUrl:andUserId:) , [`inviteMessagingWithChannelUrl:andUserIds:`](./SendBird.html#//api/name/inviteMessagingWithChannelUrl:andUserIds:) , [`startMessagingWithUserId:`](./SendBird.html#//api/name/startMessagingWithUserId:) , [`startMessagingWithUserIds:`](./SendBird.html#//api/name/startMessagingWithUserIds:) , [`joinMessagingWithChannelUrl:`](./SendBird.html#//api/name/joinMessagingWithChannelUrl:) has been called.
 *  @param messagingUpdated         Calls when a messaging channel has been updated. Occurs when [`inviteMessagingWithChannelUrl:andUserId:`](./SendBird.html#//api/name/inviteMessagingWithChannelUrl:andUserId:), [`inviteMessagingWithChannelUrl:andUserIds:`](./SendBird.html#//api/name/inviteMessagingWithChannelUrl:andUserIds:) has been called inside Group Messaging Channels.
 *  @param messagingEnded           Calls when messaging has ended. Occurs when [`endMessagingWithChannelUrl:`](./SendBird.html#//api/name/endMessagingWithChannelUrl:) is called
 *  @param allMessagingEnded        Calls when all messaging has ended at once. Occurs when [`endAllMessaging`](./SendBird.html#//api/name/endAllMessaging) is called.
 *  @param messagingHidden          Calls when a messaging channel becomes hidden. Occurs when [`hideMessagingWithChannelUrl:`](./SendBird.html#//api/name/hideMessagingWithChannelUrl:) is called.
 *  @param allMessagingHidden       Calls when all messaging channels becomes hidden at once. Occurs when [`hideAllMessaging`](./SendBird.html#//api/name/hideAllMessaging) is called.
 *  @param readReceived             Calls when Read command is called.
 *  @param typeStartReceived        Calls when typing event starts. Information regarding the user and the timestamp of the event can be found within [`SendBirdTypeStatus`](./SendBirdTypeStatus.html) class.
 *  @param typeEndReceived          Calls when typing event ends. Information regarding the user and the timestamp of the event can be found within [`SendBirdTypeStatus`](./SendBirdTypeStatus.html) class.
 *  @param allDataReceived          Calls when any data is received.
 *  @param messageDelivery          Calls when the current user successfully sends a message. Use this o find out if the message has been successfully delivered when [`sendMessage:`](./SendBird.html#//api/name/sendMessage:), [`sendMessage:withTempId:`](./SendBird.html#//api/name/sendMessage:withTempId:), [`sendMessage:withData:`](./SendBird.html#//api/name/sendMessage:withData:), [`sendMessage:withData:andTempId:`](./SendBird.html#//api/name/sendMessage:withData:andTempId:), [`sendMessage:withData:andTempId:mentionedUserIds:`](./SendBird.html#//api/name/sendMessage:withData:andTempId:mentionedUserIds:), [`sendFile:`](./SendBird.html#//api/name/sendFile:) were used to send messages.
 *  @param mutedMessagesReceivedBlock Calls when muted message is received.
 *  @param mutedFileReceivedBlock   Calls when mutem file message is received.
 */

+ (void) setEventHandlerConnectBlock:(void (^)(SendBirdChannel *channel))connect errorBlock:(void (^)(NSInteger code))error channelLeftBlock:(void (^)(SendBirdChannel *channel))channelLeft messageReceivedBlock:(void (^)(SendBirdMessage *message))messageReceived systemMessageReceivedBlock:(void (^)(SendBirdSystemMessage *message))systemMessageReceived broadcastMessageReceivedBlock:(void (^)(SendBirdBroadcastMessage *message))broadcastMessageReceived fileReceivedBlock:(void (^)(SendBirdFileLink *fileLink))fileReceived messagingStartedBlock:(void (^)(SendBirdMessagingChannel *channel))messagingStarted messagingUpdatedBlock:(void (^)(SendBirdMessagingChannel *channel))messagingUpdated messagingEndedBlock:(void (^)(SendBirdMessagingChannel *channel))messagingEnded allMessagingEndedBlock:(void (^)())allMessagingEnded messagingHiddenBlock:(void (^)(SendBirdMessagingChannel *channel))messagingHidden allMessagingHiddenBlock:(void (^)())allMessagingHidden readReceivedBlock:(void (^)(SendBirdReadStatus *status))readReceived typeStartReceivedBlock:(void (^)(SendBirdTypeStatus *status))typeStartReceived typeEndReceivedBlock:(void (^)(SendBirdTypeStatus *status))typeEndReceived allDataReceivedBlock:(void (^)(NSUInteger sendBirdDataType, int count))allDataReceived messageDeliveryBlock:(void (^)(BOOL send, NSString *message, NSString *data, NSString *tempId))messageDelivery mutedMessagesReceivedBlock:(void (^)(SendBirdMessage *message))mutedMessagesReceivedBlock mutedFileReceivedBlock:(void (^)(SendBirdFileLink *message))mutedFileReceivedBlock;

+ (void) setEventHandlerMultipleChannelConnectBlock:(void (^)(NSArray<SendBirdChannel *> *channels))connect channelLeftBlock:(void (^)(NSArray<SendBirdChannel *> *channels))channelLeft messageReceivedBlock:(void (^)(SendBirdChannel *channel, SendBirdMessage *message))messageReceived systemMessageReceivedBlock:(void (^)(SendBirdChannel *channel, SendBirdSystemMessage *message))systemMessageReceived broadcastMessageReceivedBlock:(void (^)(SendBirdChannel *channel, SendBirdBroadcastMessage *message))broadcastMessageReceived fileReceivedBlock:(void (^)(SendBirdChannel *channel, SendBirdFileLink *fileLink))fileReceived messageDeliveryBlock:(void (^)(SendBirdChannel *channel, BOOL send, NSString *message, NSString *data, NSString *tempId))messageDelivery mutedMessagesReceivedBlock:(void (^)(SendBirdChannel *channel, SendBirdMessage *message))mutedMessagesReceivedBlock mutedFileReceivedBlock:(void (^)(SendBirdChannel *channel, SendBirdFileLink *message))mutedFileReceivedBlock errorBlock:(void (^)(NSInteger code))error;

/**
 *  Get the instance of the current channel
 *
 *  @return Channel instance
 */
+ (SendBirdChannel *) getCurrentChannel;

/**
 *  Start Messaging with the person using User ID([`guestId`](./SendBirdUser.html#//api/name/guestId))
 *
 *  @param userId The other person's User ID to start Messaging with
 */
+ (void) startMessagingWithUserId:(NSString *)userId;

/**
 *  Start Messaging with the person using User ID([`guestId`](./SendBirdUser.html#//api/name/guestId))
 *  This will create Group Messaging Channel not 1 on 1 Messaging Channel
 *
 *  @param userId The other person's User ID to start Messaging with
 */
+ (void) startMessagingAsGroupWithUserId:(NSString *)userId;

/**
 *  Start Group Messaging with people using the array of User IDs([`guestId`](./SendBirdUser.html#//api/name/guestId)) (Messaging/Group Messaging only)
 *
 *  @param userIds NSArray of User IDs containing the list of people to start Group Messaging with
 */
+ (void) startMessagingWithUserIds:(NSArray *)userIds;

/**
 *  Join Messaging channel. In order to join a Group Messaging Channel, the user needs to be in the member list of that channel. (Messaging/Group Messaging only)
 *
 *  @param channelUrl Channel URL to join
 */
+ (void) joinMessagingWithChannelUrl:(NSString *)channelUrl;

/**
 *  Invite the list of users with User ID([`guestId`](./SendBirdUser.html#//api/name/guestId)) to the Messaging channel. (Messaging/Group Messaging only)
 *
 *  @param channelUrl Channel URL of the Messaging channel to invite into
 *  @param userId     User ID of the invitee
 */
+ (void) inviteMessagingWithChannelUrl:(NSString *)channelUrl andUserId:(NSString *)userId;

/**
 *  Invite the list of users with User IDs([`guestId`](./SendBirdUser.html#//api/name/guestId)) to the Messaging channel. (Messaging/Group Messaging only)
 *
 *  @param channelUrl Channel URL of the Messaging channel to invite into
 *  @param userIds    NSArray of User IDs containing the list of people to invite
 */
+ (void) inviteMessagingWithChannelUrl:(NSString *)channelUrl andUserIds:(NSArray *)userIds;

/**
 *  End Messaging (Messaging/Group Messaging only)
 *
 *  @param channelUrl Channel URL to end messaging
 */
+ (void) endMessagingWithChannelUrl:(NSString *)channelUrl;

/**
 *  End all Messaging by the user (Messaging/Group Messaging only)
 */
+ (void) endAllMessaging;

/**
 *  Hide the target Messaging channel from the Messaging channel list. (Messaging/Group Messaging only)
 *
 *  @param channelUrl Channel URL of the Messaging channel to hide
 */
+ (void) hideMessagingWithChannelUrl:(NSString *)channelUrl;

/**
 *  Hide all of user's Messaging channels from the list (Messaging/Group Messaging only)
 */
+ (void) hideAllMessaging;

/**
 *  Notify that the typing started (Messaging/Group Messaging only)
 */
+ (void) typeStart;

/**
 *  Notify that the typing ended (Messaging/Group Messaging only)
 */
+ (void) typeEnd;

/**
 *  Mark all messages read within the current channel. This will set the Unread message count to 0 for the current channel. (Messaging/Group Messaging only)
 */
+ (void) markAsRead;

/**
 *  Mark all messages read within the targeted channel. This will set the Unread message count to 0 for the targeted channel. (Messaging/Group Messaging only)
 *
 *  @param channelUrl Target Messaging Channel URL
 */
+ (void) markAsReadForChannel:(NSString *)channelUrl;

/**
 *  Mark all messages read within all of the joined channels. This will set the Unread message count to 0 for all of the joined channels. (Messaging/Group Messaging only)
 */
+ (void) markAllAsRead;

/**
 *  Connect to the chat server. Upon connection, some of the previous messages will be retrieved. connect callback will be invoked once connected.
 */
+ (void) connect;

/**
 *  Connect to the chat server. Upon connection, some of the messages prior to the given timestamp will be retrieved. connect callback will be invoked once connected.
 *
 *  @param messageTs UTC timestamp
 */
+ (void) connectWithMessageTs:(long long)messageTs;

/**
 *  Cancel all running asynchronous jobs
 */
+ (void) cancelAll;

/**
 *  Disconnect from chat server
 */
+ (void) disconnect;

/**
 *  Register callback for Messaging channel/Group messaging channel update and user mentions
 *
 *  @param messagingChannelUpdated Calls upon Messaging channel updates
 *  @param mentionUpdated          Calls upon user mentions
 */
+ (void) registerNotificationHandlerMessagingChannelUpdatedBlock:(void (^)(SendBirdMessagingChannel *channel))messagingChannelUpdated mentionUpdatedBlock:(void (^)(SendBirdMention *mention))mentionUpdated;

/**
 *  Unregister callback for Messaging channel/Group messaging channel update and user mentions
 */
+ (void) unregisterNotificationHandlerMessagingChannelUpdatedBlock;

/**
 *  Send a message
 *
 *  @param message Message body
 */
+ (void) sendMessage:(NSString *)message;

/**
 *  Send a temporary message with an ID. Temporary message ID is used to identify the message. Temporary ID can be used with [`messageDelivery`](./SendBird.html#//api/name/setEventHandlerConnectBlock:errorBlock:channelLeftBlock:messageReceivedBlock:systemMessageReceivedBlock:broadcastMessageReceivedBlock:fileReceivedBlock:messagingStartedBlock:messagingUpdatedBlock:messagingEndedBlock:allMessagingEndedBlock:messagingHiddenBlock:allMessagingHiddenBlock:readReceivedBlock:typeStartReceivedBlock:typeEndReceivedBlock:allDataReceivedBlock:messageDeliveryBlock:) to verify successfull message delivery
 *
 *  @param message Message body
 *  @param tempId  Temporary ID used for message identification
 */
+ (void) sendMessage:(NSString *)message withTempId:(NSString *)tempId;

/**
 *  Send a message with data
 *
 *  @param message Message body
 *  @param data    Data to send
 */
+ (void) sendMessage:(NSString *)message withData:(NSString *)data;

/**
 *  Send a temporary message and data with an ID. Temporary message ID is used to identify the message. Temporary ID can be used with [`messageDelivery`](./SendBird.html#//api/name/setEventHandlerConnectBlock:errorBlock:channelLeftBlock:messageReceivedBlock:systemMessageReceivedBlock:broadcastMessageReceivedBlock:fileReceivedBlock:messagingStartedBlock:messagingUpdatedBlock:messagingEndedBlock:allMessagingEndedBlock:messagingHiddenBlock:allMessagingHiddenBlock:readReceivedBlock:typeStartReceivedBlock:typeEndReceivedBlock:allDataReceivedBlock:messageDeliveryBlock:) to verify successfull message delivery
 *
 *  @param message Message body
 *  @param data    Data to send
 *  @param tempId  Temporary ID used for message identification
 */
+ (void) sendMessage:(NSString *)message withData:(NSString *)data andTempId:(NSString *)tempId;

/**
 *  Send a message, data, and the list of User IDs to send mentions with a temporary ID. Temporary message ID is used to identify the message. Temporary ID can be used with [`messageDelivery`](./SendBird.html#//api/name/setEventHandlerConnectBlock:errorBlock:channelLeftBlock:messageReceivedBlock:systemMessageReceivedBlock:broadcastMessageReceivedBlock:fileReceivedBlock:messagingStartedBlock:messagingUpdatedBlock:messagingEndedBlock:allMessagingEndedBlock:messagingHiddenBlock:allMessagingHiddenBlock:readReceivedBlock:typeStartReceivedBlock:typeEndReceivedBlock:allDataReceivedBlock:messageDeliveryBlock:) to verify successfull message delivery. Users within the list of User IDs will invoke [`mentionUpdated`](./SendBird.html#//api/name/registerNotificationHandlerMessagingChannelUpdatedBlock:mentionUpdatedBlock:) callbacks.
 *
 *  @param message          Message body
 *  @param data             Data to send
 *  @param tempId           Temporary ID used for message identification
 *  @param mentionedUserIds NSArray of the User IDs to send mentions to
 */
+ (void) sendMessage:(NSString *)message withData:(NSString *)data andTempId:(NSString *)tempId mentionedUserIds:(NSArray *)mentionedUserIds;

+ (void) sendMessage:(NSString *)message withData:(NSString *)data andTempId:(NSString *)tempId mentionedUserIds:(NSArray *)mentionedUserIds toChannel:(SendBirdChannel *)channel;

/**
 *  Send a file
 *
 *  @param fileInfo File information
 */
+ (void) sendFile:(SendBirdFileInfo *)fileInfo;

+ (void) sendFile:(SendBirdFileInfo *)fileInfo toChannel:(SendBirdChannel *)channel;

/**
 *  Upload a file
 *
 *  @param file        File data using NSData class
 *  @param type        File type
 *
 *  - `video`
 *  - `image`
 *  - `etc`
 *  @param size        File size
 *  @param customField Custom data
 *  @param onUpload    Callback block invoked upon completition of the upload
 *
 *  @deprecated in 2.1.1. Use [`uploadFile:filename:type:hasSizeOfFile:withCustomField:uploadBlock:`](./SendBird.html#//api/name/uploadFile:filename:type:hasSizeOfFile:withCustomField:uploadBlock:)
 */
+ (void) uploadFile:(NSData *)file type:(NSString *)type hasSizeOfFile:(unsigned long)size withCustomField:(NSString *)customField uploadBlock:(void (^)(SendBirdFileInfo *fileInfo, NSError *error))onUpload DEPRECATED_ATTRIBUTE;

/**
 *  Upload a file
 *
 *  @param file        File data using NSData class
 *  @param aFilename   File name
 *  @param type        File type
 *
 *  - `video`
 *  - `image`
 *  - `etc`
 *  @param size        File size
 *  @param customField Custom data
 *  @param onUpload    Callback block invoked upon completition of the upload
 */
+ (void) uploadFile:(NSData *)file filename:(NSString *)aFilename type:(NSString *)type hasSizeOfFile:(unsigned long)size withCustomField:(NSString *)customField uploadBlock:(void (^)(SendBirdFileInfo *fileInfo, NSError *error))onUpload;

/**
 *  Create an instance of [`SendBirdMessagingChannelListQuery`](./SendBirdMessagingChannelListQuery.html) to get the list of Messaging/Group Messaging channels
 *
 *  @return [`SendBirdMessagingChannelListQuery`](./SendBirdMessagingChannelListQuery.html) instance.
 */
+ (SendBirdMessagingChannelListQuery *) queryMessagingChannelList;

/**
 *  Create an instance of [`SendBirdChannelListQuery`](./SendBirdChannelListQuery.html) to get the list of Open Chat Channels
 *
 *  @return [`SendBirdChannelListQuery`](./SendBirdChannelListQuery.html) instance
 */
+ (SendBirdChannelListQuery *) queryChannelList;

/**
 *  Create an instance of [`SendBirdChannelListQuery`](./SendBirdChannelListQuery.html) to get the list of Open Chat Channels based on the searched keyword
 *
 *  @param keyword Keyword used to search the channels
 *
 *  @return Searched [`SendBirdChannelListQuery`](./SendBirdChannelListQuery.html) instance
 */
+ (SendBirdChannelListQuery *) queryChannelListWithKeyword:(NSString *)keyword;

/**
 *  Create the instance of [`SendBirdChannelListQuery`](./SendBirdChannelListQuery.html) for Unity
 *
 *  @return [`SendBirdChannelListQuery`](./SendBirdChannelListQuery.html) instance
 */
+ (SendBirdChannelListQuery *) queryChannelListForUnity;

/**
 *  Create the instance of [`SendBirdMemberListQuery`](./SendBirdMemberListQuery.html) to get the list of members within the target channel
 *
 *  @param channelUrl Channel URL
 *
 *  @return [`SendBirdMemberListQuery`](./SendBirdMemberListQuery.html) instance.
 */
+ (SendBirdMemberListQuery *) queryMemberListInChannel:(NSString *)channelUrl;

/**
 *  Create the instance of [`SendBirdMessageListQuery`](./SendBirdMessageListQuery.html)  to retrieve the messages within the target channel 
 *
 *  @param channelUrl Channel URL.
 *
 *  @return [`SendBirdMessageListQuery`](./SendBirdMessageListQuery.html) instance.
 */
+ (SendBirdMessageListQuery *) queryMessageListInChannel:(NSString *)channelUrl;

/**
 *  Create the instance of [`SendBirdMessagingUnreadCountQuery`](./SendBirdMessagingUnreadCountQuery.html) to get the unread message count for the target user
 *
 *  @return [`SendBirdMessagingUnreadCountQuery`](./SendBirdMessagingUnreadCountQuery.html) instance.
 */
+ (SendBirdMessagingUnreadCountQuery *) queryMessagingUnreadCount;

+ (void) messageReceived:(SendBirdMessage *)msg DEPRECATED_ATTRIBUTE;

+ (void) fileReceived:(SendBirdFileLink *)fileLink DEPRECATED_ATTRIBUTE;

+ (void) broadcastMessageReceived:(SendBirdBroadcastMessage *)msg DEPRECATED_ATTRIBUTE;

+ (void) systemMessageReceived:(SendBirdSystemMessage *)msg DEPRECATED_ATTRIBUTE;

+ (void) messagingStarted:(SendBirdMessagingChannel *)channel DEPRECATED_ATTRIBUTE;

+ (void) messagingEnded:(SendBirdMessagingChannel *)channel DEPRECATED_ATTRIBUTE;

/**
 *  Get IDFV for the Device
 *
 *  @return Device IDFV
 */
+ (NSString *) deviceUniqueID;

/**
 *  Get the chat server connection status
 *
 *  @return WSReadyState
 *
 *  - `WS_CONNECTING` - Connecting to the chat server
 *  - `WS_OPEN` - Connected to the chat server
 *  - `WS_CLOSING` - Disconnecting from the chat server
 *  - `WS_CLOSED` - Disconnected from the chat server
 */
+ (enum WSReadyState) connectState;

/**
 *  Create the instance of [`SendBirdOnlineMemberCountQuery`](./SendBirdOnlineMemberCountQuery.html) to retrieve the users.
 *
 *  @return [`SendBirdOnlineMemberCountQuery`](./SendBirdOnlineMemberCountQuery.html) instance.
 *
 *  @deprecated in 2.0.24. Use [`SendBirdMemberCountQuery`](./SendBirdMemberCountQuery.html)
 */
+ (SendBirdOnlineMemberCountQuery *) queryOnlineMemberCount:(NSString *)channelUrl DEPRECATED_ATTRIBUTE;

/**
 *  Create the instance of [`SendBirdUserListQuery`](./SendBirdUserListQuery.html) to retrieve the users.
 *
 *  @return [`SendBirdUserListQuery`](./SendBirdUserListQuery.html) instance.
 */
+ (SendBirdUserListQuery *) queryUserList;

/**
 *  Set the current device token to SendBird. Refer to [Push Notification](https://sendbird.gitbooks.io/sendbird-ios-sdk/content/en//push_notifications.html) document.
 *
 *  @param devToken Device token for APNS.
 */
+ (void) registerForRemoteNotifications:(NSData *)devToken;

/**
 *  Register device token to SendBird for APNS. You have to invoke [`registerForRemoteNotifications:`](./SendBird.html#//api/name/registerForRemoteNotifications:) in advanced.
 *
 *  @param onResult callback for the result
 */
+ (void) registerPushToken:(void (^)(NSDictionary *response, NSError *error))onResult;

/**
 *  Unregister current device token from SendBird.
 *
 *  @param onResult callback for the result
 */
+ (void) unregisterCurrentDevicePushToken:(void (^)(NSDictionary *response, NSError *error))onResult;

/**
 *  Unregister all devices token for the user from SendBird.
 *
 *  @param onResult callback for the result
 */
+ (void) unregisterAllDevicesPushToken:(void (^)(NSDictionary *response, NSError *error))onResult;

/**
 *  Check if the users exist.
 *
 *  @param userList List of user id
 *  @param onResult callback for the result
 */
+ (void) checkUserExistenceWithUserList:(NSArray<NSString *> *)userList resultBlock:(void (^)(NSDictionary<NSString *, SendBirdAppUser *>*response, NSError *error))onResult;

/**
 *  For UnitTest
 */
+ (void) testUserBlockListResultBlock:(void (^)(NSDictionary *response, NSError *error))onResult;

+ (NSString *) getDeviceToken;

/**
 *  Delete message
 *
 *  @param msgId    message ID to be deleted
 *  @param onResult Callback for result
 */
+ (void) deleteMessage:(long long)msgId resultBlock:(void (^)(NSDictionary *response, NSError *error))onResult;

/**
 *  Create instance of [`SendBirdChannelMetaDataQuery`](./SendBirdChannelMetaDataQuery.html) to manipulate meta data of channel
 *
 *  @param channelUrl Channel URL to manipulate
 *
 *  @return [`SendBirdChannelMetaDataQuery`](./SendBirdChannelMetaDataQuery.html) instance.
 */
+ (SendBirdChannelMetaDataQuery *) queryChannelMetaDataWithChannelUrl:(NSString *)channelUrl;

/**
 *  Create instance of [`SendBirdChannelMetaCounterQuery`](./SendBirdChannelMetaCounterQuery.html) to manipulate meta counter of channel
 *
 *  @param channelUrl Channel URL to manipulate
 *
 *  @return [`SendBirdChannelMetaCounterQuery`](./SendBirdChannelMetaCounterQuery.html) instance.
 */
+ (SendBirdChannelMetaCounterQuery *) queryChannelMetaCounterWithChannelUrl:(NSString *)channelUrl;

/**
 *  Create the instance of [`SendBirdMemberCountQuery`](./SendBirdMemberCountQuery.html) to retrieve the users.
 *
 *  @return [`SendBirdMemberCountQuery`](./SendBirdMemberCountQuery.html) instance.
 */
+ (SendBirdMemberCountQuery *) queryMemberCount:(NSString *)channelUrl;

/**
 *  Received system event
 *
 *  @param systemEventReceivedBlock Callback for received system event
 */
+ (void) setSystemEventReceivedBlock:(void (^)(SendBirdSystemEvent *event))systemEventReceivedBlock;

+ (void) setMultiChannelSystemEventReceivedBlock:(void (^)(SendBirdChannel *channel, SendBirdSystemEvent *event))systemEventReceivedBlock;

+ (NSString *)getAppID;

+ (void)getHostURLWithResultBlock:(void (^)(NSError *error))onResult;

@end
