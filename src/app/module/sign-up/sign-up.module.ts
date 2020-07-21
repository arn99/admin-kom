import { SignUpComponent } from './../../components/sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SignUpRoutingModule
  ]
})
export class SignUpModule { }
