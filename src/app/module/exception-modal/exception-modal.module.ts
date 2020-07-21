import { ExceptionModalComponent } from './../../components/exception-modal/exception-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExceptionModalRoutingModule } from './exception-modal-routing.module';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [ExceptionModalComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ExceptionModalRoutingModule
  ]
})
export class ExceptionModalModule { }
