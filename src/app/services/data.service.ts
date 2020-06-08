import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  Genkey(lenght: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < lenght; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
}
