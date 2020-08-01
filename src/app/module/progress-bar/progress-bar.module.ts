import { ProgressBarComponent } from './../../components/progress-bar/progress-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressBarRoutingModule } from './progress-bar-routing.module';
import { MaterialModule } from '../shared/material.module';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatToolbarModule,
    ProgressBarRoutingModule
  ]
})
export class ProgressBarModule { }
