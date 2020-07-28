import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { isPlatformBrowser } from '@angular/common';
const SecureStorage = require('secure-web-storage');
const SECRET_KEY = 'm key secret';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: any;
  public secureStorage: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.storage = localStorage;
        this.secureStorage = new SecureStorage(localStorage, {
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
  }

}
