import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule, ScrollHooks } from 'ng-lazyload-image';
import { FoodCardRoutingModule } from './food-card-routing.module';


@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    MaterialModule,
    LazyLoadImageModule,
    FoodCardRoutingModule
  ]
})
export class FoodCardModule { }
