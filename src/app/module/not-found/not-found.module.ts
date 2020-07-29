import { NotFoundComponent } from './../../components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { OrderDeliverRoutingModule } from '../order-deliver/order-deliver-routing.module';



@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    MaterialModule,
    OrderDeliverRoutingModule
  ]
})
export class NotFoundModule { }
