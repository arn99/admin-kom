import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LocalService } from 'src/app/services/local.service';
import { FoodService } from 'src/app/services/food.service';
@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent {

  itemNumber = 1;
  itemTotal = 0;
  list = [];
  food: any;
  constructor(public dialogRef: MatDialogRef<ShopCartComponent>,
                      @Inject(MAT_DIALOG_DATA) public data,
                      private localService: LocalService,
                      private foodService: FoodService) {
      this.food = data;
      this.foodService.getNotification().subscribe(message => {
      this.itemTotal = message;
      });
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addFood() {
    this.itemTotal =  this.itemNumber;
    this.food['numberOfItem'] = this.itemNumber;
    const food = this.food;
    if (this.getLocalStorage() !== null) {
      this.list = this.getLocalStorage();
    }
    let foodOccurrence: number;
        foodOccurrence = this.findWithAttr(this.list, 'name', food['name']);
    if (foodOccurrence  >= 0 ) {
      this.list[foodOccurrence]['numberOfItem'] =  this.list[foodOccurrence]['numberOfItem'] +  this.itemNumber;
      this.setLocalStorage(this.list);
    } else {
      this.list.push(food) ;
      this.setLocalStorage(this.list);
    }
      this.getLocalStorage();
    this.foodService.newUpdate(this.itemTotal);
    this.dialogRef.close();
  }
  removeItem() {
    if (this.itemNumber > 1) {
      this.itemNumber --;
      this.getLocalStorage();
    }
  }
  plusItem() {
    this.itemNumber ++;
  }
  setLocalStorage(data) {
    // Set the User data
    this.localService.setJsonValue('test', data);
  }
  getLocalStorage(): [] {
    // Get the user data
    const foods = this.localService.getJsonValue('test');
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
  /*
  logoutUser() {
    // Clear the localStorage
    this.localService.clearToken();
  } */
}
