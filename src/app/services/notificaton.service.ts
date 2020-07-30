import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class NotificatonService {
  notify: any;
  constructor() {
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
}
