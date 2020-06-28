import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CheckoutFormComponent } from '../checkout-form/checkout-form.component';
@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent implements OnInit {

  displayedColumns = ['item', 'cost', 'action'];
  transactions = [
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 5},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
  ];
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(data): void {
    const dialogRef = this.dialog.open(CheckoutFormComponent, {
      width: '75%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }
  checkout() {
    this.openDialog(this.transactions);
    console.log('finaliser');
  }
  removeItem() {
    console.log('yoo remove');
  }
  removeOneItem() {
    console.log('yoo remove');
  }
  plusItem() {
    console.log('yoo plus');
  }
}
