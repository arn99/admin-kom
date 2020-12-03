import { Order } from './../models/order.model';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, of, Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = 'http://d0403a7ae217.ngrok.io/';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  [x: string]: any;
  orders: Order[] = [];
  ordersSubject = new Subject<Order[]>();

  constructor(private firestore: AngularFirestore, private http: HttpClient) {
  }
  // handel error of api
  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  emitOrders() {
    this.ordersSubject.next(this.orders);
  }
  getOrders(restoId) {
    return this.firestore.collection(
      'orders', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (restoId) {
          query = query.where('restaurant.id', '==', restoId);
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
  getOrdersAdmin() {
    return this.firestore.collection(
      'orders', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          query = query.where('paymentState', '==', 'none');
          query = query.where('state', '==', 'waiting');
        return query;
    }).snapshotChanges();
  }
  getDelivererOrders() {
    return this.firestore.collection(
      'orders', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          query = query.where('paymentState', '==', 'none');
          query = query.where('state', '==', 'ready');
        return query;
    }).snapshotChanges();
  }

  /**create order data */
  createCompte(orderData): Observable<Order> {
    return this.http.post<Order>(apiUrl, orderData).pipe(
      tap(order => console.log(`Order`)),
      catchError(this.handleError<Order>('order'))
    );
  }
  /* uapdate order */
  updateCompte (orderData: Order): Observable<Order> {
    const url = `${apiUrl}/${orderData.id}`;
    return this.http.put<Order>(url, orderData, httpOptions).pipe(
      tap(operation => console.log(`order-update`)),
      catchError(this.handleError<Order>('order-update'))
    );
  }
  /** get order */
  getCompte (): Observable<Order[]> {
    return this.http.get<Order[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched order')),
        catchError(this.handleError('getOrder', []))
      );
  }

  getCompteById(id: string): Observable<Order> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Order>(url).pipe(
      tap(_ => console.log(`fetched Order id=${id}`)),
      catchError(this.handleError<Order>(`getOrder id=${id}`))
    );
  }
  async createOrder(data) {
    return this.firestore.collection('orders').add(
      data
      ).then((value) => {
        console.log(value.id);
        return value.id;
      }).catch((value) => {
        console.log(value);
        return null;
      });
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
  getOrderById (id) {
    return this.firestore.collection('orders').doc(id).valueChanges();
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

   // tslint:disable-next-line:typedef
   /**generateur de id */
   /**length est la taille de l'id */
   generateCode(length) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
