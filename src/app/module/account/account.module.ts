import { AccountComponent } from './../../components/account/account.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
