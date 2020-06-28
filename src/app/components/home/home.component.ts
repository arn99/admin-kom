
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ShopCartComponent } from '../shop-cart-modal/shop-cart.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(data): void {
    const dialogRef = this.dialog.open(ShopCartComponent, {
      width: '75%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
