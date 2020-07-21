import { ProgressBarComponent } from './../../components/progress-bar/progress-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressBarRoutingModule } from './progress-bar-routing.module';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ProgressBarRoutingModule
  ]
})
export class ProgressBarModule { }
