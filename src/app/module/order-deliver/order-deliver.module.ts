import { OrderDeliverComponent } from './../../components/order-deliver/order-deliver.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDeliverRoutingModule } from './order-deliver-routing.module';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [OrderDeliverComponent],
  imports: [
    CommonModule,
    MaterialModule,
    OrderDeliverRoutingModule
  ]
})
export class OrderDeliverModule { }
