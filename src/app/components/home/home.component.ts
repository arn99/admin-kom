import { FoodService } from 'src/app/services/food.service';

import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ShopCartComponent } from '../shop-cart-modal/shop-cart.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchText = '';
  foods: any[];
  specialFoods: any[];
  burkinabeFoods: any[];
  keyword = 'name';

  constructor(public dialog: MatDialog, private foodService: FoodService) {
    this.getFoods();
   }

  ngOnInit(): void {
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
    console.log(item);
  }
  onChangeSearch(item) {
    console.log(item);
    this.searchText = item;
  }
}
