import { SignInComponent } from './../../components/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SignInRoutingModule
  ]
})
export class SignInModule { }
