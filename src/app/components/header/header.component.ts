import { FoodService } from 'src/app/services/food.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnDestroy {

  subscription: Subscription;
  itemNumber = 0;
  constructor(public authService: AuthService, public foodService: FoodService, private localService: LocalService,) {

    this.itemNumber = this.getOrderItemNumberFromFoodList(this.localService.getJsonValue('test'));
    this.subscription = this.foodService.getNotification().subscribe(message => {
      this.itemNumber = this.itemNumber + message;
      console.log(this.itemNumber);
    });
   }


  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  getOrderItemNumberFromFoodList(list): number {
    let number = 0;
    list.forEach((item) => number = number + item.numberOfItem);
    return number;
  }
}
