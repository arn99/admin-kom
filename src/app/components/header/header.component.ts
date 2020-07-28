import { UserInterface } from './../../models/user.model';
import { FoodService } from 'src/app/services/food.service';
import { Component, OnDestroy, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { LocalService } from 'src/app/services/local.service';
import { Router } from '@angular/router';
import * as Category from './../../models/category.model';
import { MatSidenav } from '@angular/material/sidenav';
import { BottomNavItem } from 'ngx-bottom-nav';
import { LocalStorage } from 'src/app/utils/local-storage';
import { AppComponent } from 'src/app/app.component';
import { isPlatformBrowser } from '@angular/common';
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
  currentUser: any;
  currentUserSubscription: Subscription;
  @ViewChild('sidenav') sidenav: MatSidenav;
  items: BottomNavItem[];
  private localStorage: Storage;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              public authService: AuthService, public foodService: FoodService,
              private router: Router,
              private localService: LocalService) {
                this.localStorage = new LocalStorage();
                AppComponent.isBrowser.subscribe(isBrowser => {
                  if (isBrowser) {
                    this.localStorage = localStorage;
                  }
                });
                let userProfile: UserInterface;
                if (isPlatformBrowser(this.platformId)) {
                    if (this.localStorage.getItem('user') !== undefined || this.localStorage.getItem('user') !== null) {
                      console.log(this.localStorage.getItem('user'));
                      userProfile = JSON.parse(this.localStorage.getItem('user'));
                    } else {
                      userProfile = null;
                    }
                  } else {
                      if (this.localStorage.getItem('user') === undefined || this.localStorage.getItem('user') === 'null') {
                        userProfile = null;
                      } else {
                        console.log(this.localStorage.getItem('user'));
                        userProfile = JSON.parse(this.localStorage.getItem('user'));
                      }
                }
                this.checkRole(userProfile);
    this.itemNumber = this.getOrderItemNumberFromFoodList(this.localService.getJsonValue('test'));
    this.categories = Category.categories;
    this.subscription = this.foodService.getNotification().subscribe(message => {
      this.itemNumber = this.itemNumber + message;
    });
    this.subscriptionMinus = this.foodService.getNotificationMinus().subscribe(message => {
      this.itemNumber = message;
    });
    this.currentUserSubscription = authService.getCurrentNotification().subscribe( message => {
      this.currentUser = message;
      if (message !== undefined || message !== null) {
        message = message;
      } else {
        message = null;
      }
      this.checkRole(message);
    });
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
    this.sidenav.toggle();
    this.router.navigate(['/'], { queryParams: { para: item.name } });
    this.foodService.newCategorySelectNotification(item);
  }
  toggleSidenav() {
    this.isShowing = !this.isShowing;
 }
 deconnexion() {
   this.authService.SignOut();
   this.toggleSidenav();
 }
 checkRole(message) {
  if (message !== null && message.roles && message.roles.includes('resto')) {
    this.items = [
      {icon: 'home', label: 'Accueil', routerLink: ''},
      {icon: 'restaurant', label: 'Mes plats', routerLink: 'food'},
      {icon: 'menu_book', label: 'Mes commandes', routerLink: 'order/waiting'},
      {icon: 'account_circle', label: 'Compte', routerLink: 'account'},
    ];
  } else if (message !== null && message.roles && message.roles.includes('deliverer')) {
    this.items = [
      {icon: 'home', label: 'Accueil', routerLink: ''},
      {icon: 'menu_book', label: 'Livraison', routerLink: 'order/deliverer'},
      {icon: 'account_circle', label: 'Compte', routerLink: 'account'},
      {icon: 'library_books', label: 'A Propos', routerLink: 'about'},
    ];
  } else {
    this.items = [
      {icon: 'home', label: 'Accueil', routerLink: ''},
      {icon: 'restaurant', label: 'Mes Commandes', routerLink: 'my-order'},
      {icon: 'account_circle', label: 'Compte', routerLink: 'account'},
      {icon: 'library_books', label: 'A Propos', routerLink: 'about'},
    ];
  }
 }
}
