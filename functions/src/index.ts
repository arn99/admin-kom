const functions = require('firebase-functions');
import * as admin from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
admin.initializeApp(functions.config().firebase);
/** return user when email is pass */
exports.addAdminByEmail = functions.https.onCall((data: any, context: any) => {
    return admin.auth().getUserByEmail(data)
  .then(function(userRecord: any) {
    // See the UserRecord reference doc for the contents of userRecord.
    // console.log('Successfully fetched user data:', userRecord.toJSON());
    return userRecord.toJSON();
  })
  .catch(function(error: any) {
   console.log('Error fetching user data:', error);
   return {error: error};
  });

});

/** create user */
exports.addAdminCreate = functions.https.onCall((data: any, context: any) => {
    return admin.auth().createUser(data)
        .then(function(userRecord: any) {
          return {result: 'Successfully created new user:'};
        })
        .catch(function(error: any) {
          return  {error: error};
        });
});
/**update user */
exports.updateUser = functions.https.onCall((data: any, context: any) => {
    return admin.auth().updateUser(data.uid,
       data)
        .then(function(userRecord: any) {

          return userRecord.toJSON();
        })
        .catch(function(error: any) {
          return error.toJSON();
        });
  });
  /**delete user */
  exports.deleteUser = functions.https.onCall((data: any, context: any) => {
    return admin.auth().deleteUser(data.uid)
    .then(function() {
      return {result: 'Successfully deleted user'};
    })
    .catch(function(error: any) {
      return error.toJSON();
    });
  });
  /**list of all users */
  exports.listUsers = functions.https.onCall((data: any, context: any) => {
    return admin.auth().listUsers(1000)
    .then(function(listUsersResult: any) {
      return listUsersResult;
    })
    .catch(function(error: any) {
      return error;
    });
  });
  /** send notification to device */
  exports.sendNotificationByTopic = functions.https.onCall((data: any, context: any) => {
    return admin.messaging().sendToDevice(data.registrationTokens, data.payload)
    .then((response: any) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
      return response;
    })
    .catch((error: any) => {
      console.log('Error sending message:', error);
      return error;
    });
  });
  /** send notification on topic */
  exports.sendNotificationByTopic = functions.https.onCall((data: any, context: any) => {
    return admin.messaging().send(data)
    .then((response: any) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
      return response;
    })
    .catch((error: any) => {
      console.log('Error sending message:', error);
      return error;
    });
  });

  /**subscriber to notification */
  exports.subscribeToTopic = functions.https.onCall((data: any, context: any) => {
    return admin.messaging().subscribeToTopic(data.registrationTokens, data.topic)
    .then(function(response: any) {
      // See the MessagingTopicManagementResponse reference documentation
      // for the contents of response.
      console.log('Successfully subscribed to topic:', response);
      return response;
    })
    .catch(function(error: any) {
      console.log('Error subscribing to topic:', error);
      return error;
    });
  });

  /**subscriber to notification v2 */
  exports.subscribeToTopicV2 = functions.https.onCall((registrationTokens: any, topic: any, context: any) => {
    return admin.messaging().subscribeToTopic(registrationTokens, topic)
    .then(function(response: any) {
      // See the MessagingTopicManagementResponse reference documentation
      // for the contents of response.
      console.log('Successfully subscribed to topic:', response);
      return response;
    })
    .catch(function(error: any) {
      console.log('Error subscribing to topic:', error);
      return error;
    });
  });
   /**unsubscriber to notification */
   exports.unsubscribeFromTopic = functions.https.onCall((data: any, context: any) => {
    return admin.messaging().unsubscribeFromTopic(data.registrationTokens, data.topic)
    .then(function(response: any) {
      // See the MessagingTopicManagementResponse reference documentation
      // for the contents of response.
      console.log('Successfully unsubscribed from topic:', response);
      return response;
    })
    .catch(function(error: any) {
      console.log('Error unsubscribing from topic:', error);
      return error;
    });
  });
