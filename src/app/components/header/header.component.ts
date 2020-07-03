import { FoodService } from 'src/app/services/food.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { LocalService } from 'src/app/services/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnDestroy {

  subscription: Subscription;
  subscriptionMinus: Subscription;
  itemNumber = 0;
  categories = [];
  isShowing: boolean;
  constructor(public authService: AuthService, public foodService: FoodService,
              private router: Router,
              private localService: LocalService) {

    this.itemNumber = this.getOrderItemNumberFromFoodList(this.localService.getJsonValue('test'));
    this.subscription = this.foodService.getNotification().subscribe(message => {
      this.itemNumber = this.itemNumber + message;
      console.log(this.itemNumber);
    });
    this.subscriptionMinus = this.foodService.getNotificationMinus().subscribe(message => {
      this.itemNumber = message;
      console.log(this.itemNumber);
      console.log(message);
    });
    this.categories = [
      'Poulet',
      'Fastfood',
      'Vennoiserie',
      'Cuissine burkinabe',
      'Cuissine africaine',
      'Pizza',
      'Glace',
      'Boisson'
    ];

   }


  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  getOrderItemNumberFromFoodList(list): number {
    let number = 0;
    if (list !== null) {
      list.forEach((item) => number = number + item.numberOfItem);
    }
    return number;
  }
  getNotificaton(item) {
    this.router.navigate(['/'], { queryParams: { para: item } });
    this.foodService.newCategorySelectNotification(item);
    this.toggleSidenav();
  }
  toggleSidenav() {
    this.isShowing = !this.isShowing;
 }
}
