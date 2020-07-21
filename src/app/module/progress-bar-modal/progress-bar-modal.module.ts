import { ProgressBarComponent } from './../../components/progress-bar/progress-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressBarModalRoutingModule } from './progress-bar-modal-routing.module';
import { ProgessBarModalComponent } from 'src/app/components/progess-bar-modal/progess-bar-modal.component';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [ProgessBarModalComponent, ProgressBarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ProgressBarModalRoutingModule
  ]
})
export class ProgressBarModalModule { }
