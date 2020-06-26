import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit {

  itemNumber: number;
  constructor(public dialogRef: MatDialogRef<ShopCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      console.log(data);
      this.itemNumber = 1;
    }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addFood(food) {
    console.log(food);
  }
  removeItem() {
    if (this.itemNumber > 1) {
      this.itemNumber --;
      console.log('yoo remove');
    }
  }
  plusItem() {
    this.itemNumber ++;
    console.log('yoo remove');
  }
}
