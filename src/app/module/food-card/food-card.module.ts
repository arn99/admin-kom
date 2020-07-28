import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodCardRoutingModule } from './food-card-routing.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';


@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    LazyLoadImageModule,
    MaterialModule,
    FoodCardRoutingModule
  ]
})
export class FoodCardModule { }
