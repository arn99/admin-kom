import { BackorderComponent } from './../../components/backorder/backorder.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackorderRoutingModule } from './backorder-routing.module';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [BackorderComponent],
  imports: [
    CommonModule,
    MaterialModule,
    BackorderRoutingModule
  ]
})
export class BackorderModule { }
