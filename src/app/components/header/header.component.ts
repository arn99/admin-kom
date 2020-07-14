import { FoodService } from 'src/app/services/food.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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
                if (JSON.parse(localStorage.getItem('user')) !== null && JSON.parse(localStorage.getItem('user')).roles.includes('resto')) {
                  this.items = [
                    {icon: 'home', label: 'Accueil', routerLink: ''},
                    {icon: 'restaurant', label: 'Mes plats', routerLink: 'food'},
                    {icon: 'menu_book', label: 'Mes commandes', routerLink: 'order/waiting'},
                    {icon: 'account_circle', label: 'Compte', routerLink: 'account'},
                  ];
                } else {
                  this.items = [
                    {icon: 'home', label: 'Accueil', routerLink: ''},
                    {icon: 'restaurant', label: 'Mes Commandes', routerLink: 'my-order'},
                    {icon: 'account_circle', label: 'Compte', routerLink: 'account'},
                    {icon: 'library_books', label: 'A Propos', routerLink: 'about'},
                  ];
                }
    this.itemNumber = this.getOrderItemNumberFromFoodList(this.localService.getJsonValue('test'));
    this.categories = Category.categories;
    this.subscription = this.foodService.getNotification().subscribe(message => {
      this.itemNumber = this.itemNumber + message;
      console.log(this.itemNumber);
    });
    this.subscriptionMinus = this.foodService.getNotificationMinus().subscribe(message => {
      this.itemNumber = message;
      console.log(this.itemNumber);
      console.log(message);
    });
    this.currentUserSubscription = authService.getCurrentNotification().subscribe( message => {
      this.currentUser = message;
      if (message !== null && message.roles && message.roles.includes('resto')) {
        this.items = [
          {icon: 'home', label: 'Accueil', routerLink: ''},
          {icon: 'restaurant', label: 'Mes plats', routerLink: 'food'},
          {icon: 'menu_book', label: 'Mes commandes', routerLink: 'order/waiting'},
          {icon: 'account_circle', label: 'Compte', routerLink: 'account'},
        ];
      } else {
        this.items = [
          {icon: 'home', label: 'Accueil', routerLink: ''},
          {icon: 'restaurant', label: 'Mes Commandes', routerLink: 'my-order'},
          {icon: 'account_circle', label: 'Compte', routerLink: 'account'},
          {icon: 'library_books', label: 'A Propos', routerLink: ''},
        ];
      }
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
}
