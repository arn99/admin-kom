import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificatonService {
  notify: any;
  constructor(private http: HttpClient) {
    this.notify = firebase.functions().httpsCallable('sendNotificationByTopic');
  }
  /* const mess = {
    payload: {
      notification: {
        title: 'Testing Notification!',
        body: 'Firebase is awesome',
        click_action: 'http://127.0.0.1:4007/account',
        icon: 'http://the-link-to-image/icon.png'
      }
    },
    registrationTokens: ''
  }; */

  sendNotificationToDevice(mess) {
    this.notify(mess).then(function(result) {
      console.log(result);
      console.log('yes new');
    }).catch(function(error) {
      console.log(error);
    });
  }
  sendHttpNotificationToDevice(mess) {
    const messages =  {
      'notification': {
           'title': 'Miam!',
           'body': mess.body,
           // 'click_action': 'http://127.0.0.1:4007/account',
           'icon': 'https://firebasestorage.googleapis.com/v0/b/flutterfoodapp-aa0df.appspot.com/o/logos%2Fmiam1-min.png?alt=media&token=9ebe4ebf-ff1e-461e-ae40-b3e0294e7bd6'
       },

       'to': mess.token
    };
    const headers = { 'Authorization': 'key=AAAAeq-CA04:APA91bGMfBxjQeVKQrEQ4GB0ukTovs8mlRTpV2GplA3Wv5YdkFMlnZZxj4tqvSi2yBFTRa8pMy6LiVW9ZzNPYGsbsClti2EDWSvp8DkZYeaVV_TNktUnUztz-wYRPLqW1SyC3zRQz4Xw',
    'Content-Type': 'application/json' };
    const body = messages;
    this.http.post<any>('https://fcm.googleapis.com/fcm/send', body, { headers }).subscribe(function(result) {
      console.log(result);
      console.log('yes new');
    });
  }
}
