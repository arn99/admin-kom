import { Order } from './../models/order.model';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  [x: string]: any;
  orders: Order[] = [];
  ordersSubject = new Subject<Order[]>();

  constructor(private firestore: AngularFirestore) {
    this.getOrders('J0g4w7MqxkRhaEA81QnwXey23s02');
  }
  emitOrders() {
    this.ordersSubject.next(this.orders);
  }
  getOrders(restoId) {
    return this.firestore.collection(
      'orders', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (restoId) {
          query = query.where('restaurant', '==', restoId);
        }
        return query;
    }).snapshotChanges();
  }

  saveOrders() {
    firebase.database().ref('/orders').set(this.orders);
  }
  getSingleOrder(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/orders/' + id).once('value').then(
          (data) => {
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
