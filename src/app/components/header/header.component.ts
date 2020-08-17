import { FoodService } from 'src/app/services/food.service';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { LocalService } from 'src/app/services/local.service';
import { Router } from '@angular/router';
import * as Category from './../../models/category.model';
import { MatSidenav } from '@angular/material/sidenav';
import { BottomNavItem } from 'ngx-bottom-nav';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnDestroy {

  subscription: Subscription;
  subscriptionMinus: Subscription;
  isResto: boolean;
  isDeliver: boolean;
  isAdmin: boolean;
  isUser: boolean;
  itemNumber = 0;
  categories = [];
  isShowing: boolean;
  currentUser: any;
  currentUserSubscription: Subscription;
  @ViewChild('sidenav') sidenav: MatSidenav;
  items: BottomNavItem[];
  constructor(public authService: AuthService, public foodService: FoodService,
              private router: Router,
              private localService: LocalService) {
                const userProfile = localStorage.getItem('user');
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
  if (message !== null && message.roles && message.roles.includes('aacn')) {
    this.isResto = false;
    this.isDeliver = false;
    this.isAdmin = true;
    this.isUser = false;
    this.items = [
      {icon: 'home', label: 'Accueil', routerLink: ''},
      {icon: 'menu_book', label: 'Commande', routerLink: 'order/admin'},
      {icon: 'menu_book', label: 'Livraison', routerLink: 'order/deliverer'},
      {icon: 'account_circle', label: 'Compte', routerLink: 'account'},
    ];
  } else if (message !== null && message.roles && message.roles.includes('resto')) {
    this.isResto = true;
    this.isDeliver = false;
    this.isAdmin = false;
    this.isUser = false;
    this.items = [
      {icon: 'home', label: 'Accueil', routerLink: ''},
      {icon: 'restaurant', label: 'Mes plats', routerLink: 'food'},
      {icon: 'menu_book', label: 'Mes commandes', routerLink: 'order/waiting'},
      {icon: 'account_circle', label: 'Compte', routerLink: 'account'},
    ];
  } else if (message !== null && message.roles && message.roles.includes('deliverer')) {
    this.isResto = false;
    this.isDeliver = true;
    this.isAdmin = false;
    this.isUser = false;
    this.items = [
      {icon: 'home', label: 'Accueil', routerLink: ''},
      {icon: 'menu_book', label: 'Livraison', routerLink: 'order/deliverer'},
      {icon: 'account_circle', label: 'Compte', routerLink: 'account'},
      {icon: 'library_books', label: 'A Propos', routerLink: 'about'},
    ];
  }  else {
    this.isResto = false;
    this.isDeliver = false;
    this.isUser = true;
    this.isAdmin = false;
    this.items = [
      {icon: 'home', label: 'Accueil', routerLink: ''},
      {icon: 'restaurant', label: 'Mes Commandes', routerLink: 'my-order'},
      {icon: 'account_circle', label: 'Compte', routerLink: 'account'},
      {icon: 'library_books', label: 'A Propos', routerLink: 'about'},
    ];
  }
 }
}
