import { LoadingComponent } from './../../components/loading/loading.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingRoutingModule } from './loading-routing.module';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    LoadingRoutingModule
  ]
})
export class LoadingModule { }
