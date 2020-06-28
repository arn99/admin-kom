import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LocalService } from 'src/app/services/local.service';
import { FoodService } from 'src/app/services/food.service';
@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit {

  itemNumber: number;
  constructor(public dialogRef: MatDialogRef<ShopCartComponent>,
                      @Inject(MAT_DIALOG_DATA) public data,
                      private localService: LocalService,
                      public foodService: FoodService) {
      console.log(data);
      this.itemNumber = 1;
    }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addFood(food) {
    const data = {
      'name': 'rams',
      'monney': '10.000.000$'
    };
    console.log(food);
    this.setLocalStorage(data);
    this.foodService.newUpdate(this.itemNumber);
  }
  removeItem() {
    if (this.itemNumber > 1) {
      this.itemNumber --;
      console.log('yoo remove');
      this.getLocalStorage();
    }
  }
  plusItem() {
    this.itemNumber ++;
    console.log('yoo plus');
  }
  setLocalStorage(data) {
    // Set the User data
    this.localService.setJsonValue('test', data);
  }
  getLocalStorage() {
    // Get the user data
    const user = this.localService.getJsonValue('test');
    console.log(user);
  }/*
  logoutUser() {
    // Clear the localStorage
    this.localService.clearToken();
  } */
}
