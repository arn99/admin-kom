import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodCardRoutingModule } from './food-card-routing.module';


@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    MaterialModule,
    FoodCardRoutingModule
  ]
})
export class FoodCardModule { }
