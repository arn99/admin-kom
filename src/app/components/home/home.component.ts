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
  searchText = '';
  foods: any[];
  specialFoods: any[];
  burkinabeFoods: any[];
  keyword = 'name';
  subscription: Subscription;
  subscriptionRout: Subscription;
  categories: Category.Category[];

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private foodService: FoodService,
    private cdr: ChangeDetectorRef) {
    this.getFoods();
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
        console.log(params);
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
        const data = element.payload.doc.data();
        data['docId'] = element.payload.doc.id;
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
    console.log(data);
    const dialogRef = this.dialog.open(ShopCartComponent, {
      width: '75%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  selectEvent(item) {
    console.log(item['name']);
    this.searchText = item['name'];
  }
  onChangeSearch(item) {
    console.log(item);
    this.searchText = item;
  }
  getNotificaton(item) {
    this.searchText = item.name;
    console.log(this.foods);
    console.log(this.burkinabeFoods);
    console.log(this.specialFoods);
  }
}
