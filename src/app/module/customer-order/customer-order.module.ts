import { CustomerOrderComponent } from './../../components/customer-order/customer-order.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerOrderRoutingModule } from './customer-order-routing.module';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [CustomerOrderComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CustomerOrderRoutingModule
  ]
})
export class CustomerOrderModule { }
