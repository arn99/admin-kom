import { CheckoutFormComponent } from './../../components/checkout-form/checkout-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutFormRoutingModule } from './checkout-form-routing.module';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    CheckoutFormRoutingModule
  ]
})
export class CheckoutFormModule { }
