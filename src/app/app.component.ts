import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { firebaseConfig } from './config/firebase-config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin-kom';
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }
}
