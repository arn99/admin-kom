import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CheckoutFormComponent } from '../checkout-form/checkout-form.component';
import { LocalService } from 'src/app/services/local.service';
import { Subscription } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent implements OnDestroy {

  displayedColumns = ['item', 'cost', 'number', 'action'];
  list: MatTableDataSource<any>;
  tab: any [];
  subscription: Subscription;
  transactions = [
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 5},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
  ];
  constructor(public dialog: MatDialog, public foodService: FoodService, private localService: LocalService) {

    if (this.getLocalStorage() !== null) {
      this.list = new MatTableDataSource<Element>(this.getLocalStorage());
      this.tab = this.getLocalStorage();
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(CheckoutFormComponent, {
      width: '75%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.list = new MatTableDataSource<Element>([]);
    });
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.tab.map(food => (food.price * food.numberOfItem)).reduce((acc, value) => acc + value, 0);
  }
  /** Gets the total cost of all transactions. */
  getNumberOfItem() {
    return this.tab.map(food => (food.numberOfItem)).reduce((acc, value) => acc + value, 0);
  }
  checkout() {
    this.openDialog(this.tab);
    console.log(this.tab);
  }
  removeItem(food) {
    for (let i = this.tab.length - 1; i >= 0; --i) {
      if (this.tab[i].name === food.name) {
        this.tab.splice(i, 1);
      }
    }
    console.log(this.getNumberOfItem());
    this.foodService.newUpdate2(this.getNumberOfItem());
    this.list = new MatTableDataSource<Element>(this.tab);

    // tab = this.list;
      console.log(this.tab);
      this.subscription = this.foodService.getFoodFromlocal().subscribe(message => {
        if (message !== null) {
          this.list = message;
          console.log(this.list);
        }
      });
      this.setLocalStorage(this.tab);
  }
  removeOneItem() {
    console.log('yoo remove');
  }
  plusItem() {
    console.log('yoo plus');
  }
  getLocalStorage(): [] {
    // Get the user data
    const foods = this.localService.getJsonValue('test');
    console.log(foods);
    return foods;
  }
  findWithAttr(array, attr, value) {
    for (let i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
  }
  setLocalStorage(data) {
    // Set the User data
    this.localService.setJsonValue('test', data);
  }
}
