import { Order } from './../models/order.model';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: Order[] = [];
  ordersSubject = new Subject<Order[]>();

  constructor() {
    this.getOrders();
  }
  emitOrders() {
    this.ordersSubject.next(this.orders);
  }
  getOrders() {
    firebase.database().ref('/orders')
      .orderByChild('state')
      .equalTo('waiting')
      .on('value', (data: DataSnapshot) => {
          this.orders = data.val() ? data.val() : [];
          this.emitOrders();
          /* data.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
           self.orders.push(childSnapshot);
            // ...
          }); */
        }
      );
  }

  saveOrders() {
    firebase.database().ref('/orders').set(this.orders);
  }
  getSingleOrder(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/orders/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  removeOrder(order: Order) {
    const orderIndexToRemove = this.orders.findIndex(
      (orderEl) => {
        if (orderEl === order) {
          return true;
        }
      }
    );
    this.orders.splice(orderIndexToRemove, 1);
    this.saveOrders();
    this.emitOrders();
  }
}
