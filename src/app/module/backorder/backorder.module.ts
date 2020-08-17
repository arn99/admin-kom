import { PriceMinusProfitPipe } from './../../pipes/price-reduce.pipe';
import { BackorderComponent } from './../../components/backorder/backorder.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackorderRoutingModule } from './backorder-routing.module';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [BackorderComponent,
                PriceMinusProfitPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BackorderRoutingModule
  ]
})
export class BackorderModule { }
