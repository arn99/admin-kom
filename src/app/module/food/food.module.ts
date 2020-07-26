import { FoodComponent } from './../../components/food/food.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRoutingModule } from './food-routing.module';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [FoodComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FoodRoutingModule
  ]
})
export class FoodModule { }
