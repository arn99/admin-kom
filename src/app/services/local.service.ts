import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { StorageService } from './storage.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private storageService: StorageService) { }
  // Set the json data to local storage
  setJsonValue(key: string, value: any) {
    if (isPlatformBrowser(this.platformId)) {
      console.log('shop');
      this.storageService.secureStorage.setItem(key, value);
    } else {
      console.log('no shop');
    }
  }
  // Get the json value from local storage
  getJsonValue(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      try {
        return this.storageService.secureStorage.getItem(key);
      } catch (error) {
        return null;
      }
    } else {
      return null;
    }
  }
  // Clear the local storage
  clearToken() {
    if (isPlatformBrowser(this.platformId)) {
      return this.storageService.secureStorage.clear();
    } else {
      return null;
    }
  }
}
