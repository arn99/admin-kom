import { SuccessModalComponent } from './../../components/success-modal/success-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuccessModalRoutingModule } from './success-modal-routing.module';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [SuccessModalComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SuccessModalRoutingModule
  ]
})
export class SuccessModalModule { }
