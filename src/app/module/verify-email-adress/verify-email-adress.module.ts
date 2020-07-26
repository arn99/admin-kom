import { VerifyEmailComponent } from './../../components/verify-email/verify-email.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyEmailAdressRoutingModule } from './verify-email-adress-routing.module';


@NgModule({
  declarations: [VerifyEmailComponent],
  imports: [
    CommonModule,
    VerifyEmailAdressRoutingModule
  ]
})
export class VerifyEmailAdressModule { }
