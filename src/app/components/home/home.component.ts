import { InstallModalComponent } from './../install-modal/install-modal.component';
import { FoodService } from 'src/app/services/food.service';

import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ShopCartComponent } from '../shop-cart-modal/shop-cart.component';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import * as Category from './../../models/category.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit  {
  checkSearchText: boolean;
  searchText: string;
  foods: any[];
  specialFoods: any[];
  burkinabeFoods: any[];
  keyword = 'name';
  subscription: Subscription;
  subscriptionRout: Subscription;
  categories: Category.Category[];
  deferredPrompt: any;

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private foodService: FoodService,
    private cdr: ChangeDetectorRef) {
    this.getFoods();
    this.searchText = '';
    this.checkSearchText = false;
    this.subscription = this.foodService.getCategorySelectNotification().subscribe(message => {
     this.searchText = message;
    });
    this.categories = Category.categories;
   }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptionRout = this.route
      .queryParams
      .subscribe(params => {
        this.searchText = params.para;
      });
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  getFoods() {
    this.foodService.getFoods().subscribe((data) => {
      this.foods = [];
      this.specialFoods = [];
      this.burkinabeFoods = [];
      data.forEach((element) => {
        // tslint:disable-next-line:no-shadowed-variable
        const data = element;
        data['docId'] = element.id;
        if (data['category'] === 'Plat burlinabé' ) {
          this.burkinabeFoods.push(data);
        } else {
          this.specialFoods.push(data);
        }
        this.foods.push(data);
      });
    });
  }
  openDialog(data): void {
    this.dialog.open(ShopCartComponent, {
      width: '75%',
      data: data
    });
  }
  selectEvent(item) {
   /*  if (item.name !== '') {
      // this.searchText = item.name;
      this.checkSearchText = true;
      console.log(this.searchText);
    } else {
      this.checkSearchText = false;
    } */
    // this.getNotificaton(item);
    // this.foods = this.foods.filter(food => food.name === item.name);
  }
  trim (item) {
    return item.toString().substring(1, item.length - 1);
  }
  onChangeSearch(item) {
    this.searchText = item;
    if (item !== '') {
      this.checkSearchText = true;
    } else {
      this.checkSearchText = false;
    }
  }
  getNotificaton(item) {
    console.log(item);
    this.searchText = item.name;
    if (item !== '') {
      this.checkSearchText = true;
    } else {
      this.checkSearchText = false;
    }
  }
  onBeforeinstallprompt(ev) {
    this.deferredPrompt = ev;
  ev.preventDefault();

  // on affiche le bouton install
  this.openDialogInstall(ev);

  }
  openDialogInstall(data): void {
    this.dialog.open(InstallModalComponent, {
      width: '75%',
      data: data
    });
  }
}
