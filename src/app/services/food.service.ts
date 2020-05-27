import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import DataSnapshot = firebase.database.DataSnapshot;
import { Food } from '../models/food.model';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  configUrl = 'http://localhost:3000/restaurants?uid=testuid';
  foodDatabase = firebase.database().ref('/foods');
  foods: Food[] = [];
  foodsSubject = new Subject<Food[]>();
  constructor(private http: HttpClient) {
    //this.getFoods();
  }

  /* getFoods() {
    // now returns an Observable of Config
    return this.http.get<Food>(this.configUrl).pipe(
      catchError(this.handleError('searchHeroes', [])) // then handle the error
    );
  } */
  /* emitFoods() {
    this.foodsSubject.next(this.foods);
  }
  saveFoods() {
    this.foodDatabase.set(this.foods);
  }
  getFoods() {
    this.foodDatabase
      .orderByChild('state')
      .equalTo('waiting')
      .on('value', (data: DataSnapshot) => {
          this.foods = data.val() ? data.val() : [];
          this.emitFoods();
          /* data.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
           self.foods.push(childSnapshot);
            // ...
          });
        }
      );
  }
  getSingleFood(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/foods/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  removeFood(food: Food) {
    const foodIndexToRemove = this.foods.findIndex(
      (foodEl) => {
        if (foodEl === food) {
          return true;
        }
      }
    );
    this.foods.splice(foodIndexToRemove, 1);
    this.saveFoods();
    this.emitFoods();
  } */

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
