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
        if (restoId) {
          query = query.where('paymentState', '==', 'none');
          query = query.where('state', '==', 'waiting');
        }
        if (restoId) {
          query = query.orderBy('date', 'asc');
        }
        return query;
    }).snapshotChanges();
  }

  async updateOrder(data) {
    return this.firestore.collection('orders').doc(data.docId).update(
      data
      ).then((value) => {
        return true;
      }).catch((value) => {
        console.log(value);
        return false;
      });
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
