import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  foodSubject = new Subject<any>();
  foodSubject2 = new Subject<any>();
  categorySubject = new Subject<any>();
  constructor(private firestore: AngularFirestore) { }
  createFood(data) {
    this.firestore.collection('foods').add(
      data
      ).then((value) => {
        console.log(value.id);
      });
  }
  async updateFood(data) {
    return this.firestore.collection('foods').doc(data.docId).update(
      data
      ).then((value) => {
        return true;
      }).catch((value) => {
        console.log(value);
        return false;
      });
  }
  async deleteFood(data) {
    return this.firestore.collection('foods').doc(data).delete()
    .then((value) => {
      return true;
      }).catch((value) => {
        return false;
      });
  }
  getFoods() {
    return this.firestore.collection('foods').snapshotChanges();
  }
  getFoodById(id) {
    this.firestore.collection('foods').doc(id).get();
  }
  getFood(restoId) {
    return this.firestore.collection(
      'foods', ref => {
        // declare var `query` of type either `CollectionReference` or `Query`
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;

        // 👇 the below conditions will be applied to query
        // 👇 only when params have value in given `employee` object.

        // where condition to match employee with given phone
        if (restoId) {
          query = query.where('user', '==', restoId);
        }
        // query = query.orderBy('salary', 'asc');
       /*  // where condition to match employee with given salary
        if (employee.salary) {
          // #2. Get items by range '>=' operators, this query
          // will return the employee whose salary is
          // greater than or equal to given `employee.salary`
          query = query.where('salary', '>=', employee.salary);
        }
        // where condition to match employee with given designation
        if (employee.designation) {
          query = query.where('designation', '==', employee.designation);
        }
        // where condition to match employee with given joinDate
        if (employee.joinDate) {
          // covert date string to date object
          employee.joinDateTimestamp = new Date(employee.joinDate);
          query = query.where('joinDateTimestamp', '==', employee.joinDateTimestamp);
        } */

        /* #3 also apply query to salary order by `ascending`. */
        // query = query.orderBy('salary', 'asc');

        /* #4 apply query to joinDateTimestamp order by `descending`. */
        // query = query.orderBy('joinDateTimestamp', 'desc');

        /* #5. Apply limit to Query result.
           default order by is ascending (when we not pass second param to orderBy)
           this query will return only 2 employees
        */
        // query = query.orderBy('designation').limit(2);

        /* IMPORTANT: Reason I put this query at last because
         * We can not call Query.startAt() or Query.startAfter()
         * before calling Query.orderBy().
        */

        /* // where condition to match employee with given name
        if (employee.name) {
          query = query.orderBy('name', 'asc').startAt('An');
        } */

        // finally return query back to the collection second argument.
        return query;
    }).snapshotChanges();
  }

  public getNotification(): Observable<any> {

    return this.foodSubject.asObservable();
  }
  public getNotificationMinus(): Observable<any> {

    return this.foodSubject2.asObservable();
  }
  public newUpdate(value): any {
    this.foodSubject.next(value);
  }
  /**this return subscribre each time which a category is select */
  public getCategorySelectNotification(): Observable<any> {

    return this.categorySubject.asObservable();
  }
  /** this creat notification */
  public newCategorySelectNotification(value): any {
    this.categorySubject.next(value);
  }
  public newUpdate2(value): any {
    this.foodSubject2.next(value);
  }
  public getFoodFromlocal(): Observable<any> {

    return this.foodSubject.asObservable();
  }
  public newLocal(value): any {
    this.foodSubject.next(value);
  }

}
