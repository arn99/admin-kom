import { Component, OnInit } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'admin-kom';
  constructor(private swUpdate: SwUpdate, private push: SwPush) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
          if (confirm('New version available. Load New Version?')) {
           window.location.reload();
          }
      });
    }
    this.push.messages.subscribe(msg => console.log('push message', msg));
    this.push.notificationClicks.subscribe(click => console.log('notification click', click));
      if (!firebase.apps.length) {
        firebase.initializeApp(environment.firebase);
        navigator.serviceWorker.getRegistration().then(swr => firebase.messaging().useServiceWorker(swr)).then(
          message => {
            console.log(message);
          }
        ).catch(m => {
          // location.reload();
        });
      }
  }
  ngOnInit(): void {
    }
}
