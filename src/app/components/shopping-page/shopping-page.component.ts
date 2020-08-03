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
export class ShoppingPageComponent implements OnInit, OnDestroy {

  displayedColumns = ['item', 'cost', 'number', 'action'];
  list: MatTableDataSource<any>;
  tab: any [];
  livraison = 0;
  subscription: Subscription;
  displayTable = true;
  constructor(public dialog: MatDialog, public foodService: FoodService, private localService: LocalService) {

    if (this.getLocalStorage() !== null) {
      this.list = new MatTableDataSource<Element>(this.getLocalStorage());
      this.tab = this.getLocalStorage();
      if (!this.tab || this.tab === null || this.tab === undefined || this.tab.length === 0) {
        this.tab = [];
        this.displayTable = false;
      } else {
        this.displayTable = true;
      }
    }
    this.subscription = this.foodService.getFoodFromlocal().subscribe(message => {
      if (message !== null) {
        this.list = message;
      }
    });
  }
  ngOnInit(): void {
    this.getLivraisonPrice();
  }
  getLivraisonPrice() {
    this.tab.forEach( item => this.livraison = this.findWithAttr(this.tab, 'restaurant', item['restaurant']));
  }
  ngOnDestroy(): void {
    if (this.subscription) {
    }
    this.subscription.unsubscribe();
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(CheckoutFormComponent, {
      width: '75%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'none') {
        this.getTotalCost();
      } else {
        this.list = new MatTableDataSource<Element>([]);
        this.tab = [];
        this.displayTable = false;
        this.getTotalCost('buy');
      }
    });
  }

  /** Gets the total cost of all transactions. */
  getTotalCost(buy?) {
    if (buy) {
      return 0;
    } else {
      return this.tab.map(food => (food.price * food.numberOfItem)).reduce((acc, value) => acc + value, 0);
    }
  }
  /** Gets the total cost of all transactions. */
  getNumberOfItem() {
    return this.tab.map(food => (food.numberOfItem)).reduce((acc, value) => acc + value, 0);
  }
  checkout() {
    this.openDialog(this.tab);
  }
  removeItem(food) {
    for (let i = this.tab.length - 1; i >= 0; --i) {
      if (this.tab[i].name === food.name) {
        this.tab.splice(i, 1);
      }
    }
    this.foodService.newUpdate2(this.getNumberOfItem());
    this.list = new MatTableDataSource<Element>(this.tab);
    if (this.tab.length === 0) {
      this.displayTable = false;
    }

    // tab = this.list;
    this.getLivraisonPrice();
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
    return foods;
  }
  findWithAttr(array, attr, value): number {
    for (let i = 0; i < array.length; i += 1) {
        if (array[i][attr] !== value) {
            return 1500;
        }
    }
    return 1000;
  }
  setLocalStorage(data) {
    // Set the User data
    this.localService.setJsonValue('test', data);
  }
}
