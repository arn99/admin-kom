import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShopCartComponent } from '../shop-cart-modal/shop-cart.component';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.css']
})
export class FoodCardComponent implements OnInit {
  @Input() item: any;
  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }
  openDialog(data): void {
    console.log(data);
    const dialogRef = this.dialog.open(ShopCartComponent, {
      width: '75%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  calculatePrice(price): number {
    price = 1.1 * price;
    const multiplier = Math.pow(10, -1 || 0);
    return Math.round(price * multiplier) / multiplier;
  }
}
