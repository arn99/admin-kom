import { ShoppingPageComponent } from './../../components/shopping-page/shopping-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingPageRoutingModule } from './shopping-page-routing.module';
import { MaterialModule } from '../shared/material.module';
import { CheckoutFormComponent } from 'src/app/components/checkout-form/checkout-form.component';


@NgModule({
  declarations: [ShoppingPageComponent, CheckoutFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ShoppingPageRoutingModule
  ]
})
export class ShoppingPageModule { }
