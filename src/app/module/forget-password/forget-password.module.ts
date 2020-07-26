import { ForgotPasswordComponent } from './../../components/forgot-password/forgot-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetPasswordRoutingModule } from './forget-password-routing.module';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ForgetPasswordRoutingModule
  ]
})
export class ForgetPasswordModule { }
