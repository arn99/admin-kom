import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShopCartComponent } from '../shop-cart-modal/shop-cart.component';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.css']
})
export class FoodCardComponent {
  @Input() item: any;

  constructor(public dialog: MatDialog) {
  }
  openDialog(data): void {
    data.price = this.calculatePrice(data.price);
    this.dialog.open(ShopCartComponent, {
      width: '75%',
      data: data
    });
  }
  calculatePrice(price): number {
    price = 1.1 * price;
    const multiplier = Math.pow(10, -2 || 0);
    return Math.round(price * multiplier) / multiplier;
  }
}
