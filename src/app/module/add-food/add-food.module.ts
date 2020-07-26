import { AddFoodComponent } from './../../components/add-food/add-food.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddFoodRoutingModule } from './add-food-routing.module';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [AddFoodComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AddFoodRoutingModule
  ]
})
export class AddFoodModule { }
