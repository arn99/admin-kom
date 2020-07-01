import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  constructor(private storageService: StorageService) { }
  // Set the json data to local storage
  setJsonValue(key: string, value: any) {
      this.storageService.secureStorage.setItem(key, value);
  }
  // Get the json value from local storage
  getJsonValue(key: string) {
    try {
      return this.storageService.secureStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }
  // Clear the local storage
  clearToken() {
      return this.storageService.secureStorage.clear();
  }
}
