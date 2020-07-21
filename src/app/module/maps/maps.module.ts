import { MapsComponent } from './../../components/maps/maps.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [MapsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
