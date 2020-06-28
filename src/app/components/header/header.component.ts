import { FoodService } from 'src/app/services/food.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnDestroy {

  subscription: Subscription;
  itemNumber: number;
  constructor(public authService: AuthService, public foodService: FoodService) {
    this.itemNumber = 0;
    this.subscription = this.foodService.getNotification().subscribe(message => {
      console.log(this.itemNumber);
      this.itemNumber = message;
    });
   }


  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}
}
