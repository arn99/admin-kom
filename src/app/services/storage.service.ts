import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { AppComponent } from '../app.component';
import { LocalStorage } from '../utils/local-storage';
const SecureStorage = require('secure-web-storage');
const SECRET_KEY = 'm key secret';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStorage: Storage;
  constructor() {
    this.localStorage = new LocalStorage();
    AppComponent.isBrowser.subscribe(isBrowser => {
      if (isBrowser) {
        this.localStorage = localStorage;
      }
    });
  }
  public secureStorage = new SecureStorage(this.localStorage, {
    hash: function hash(key) {
      key = CryptoJS.SHA256(key, SECRET_KEY);

      return key.toString();
    },
    // Encrypt the localstorage data
    encrypt: function encrypt(data) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);

      data = data.toString();

      return data;
    },
    decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(data, SECRET_KEY);

        data = data.toString(CryptoJS.enc.Utf8);

        return data;
    }
    });
}
