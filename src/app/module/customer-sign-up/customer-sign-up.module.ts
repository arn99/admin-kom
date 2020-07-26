import { CustomerSignUpComponent } from './../../components/customer-sign-up/customer-sign-up.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerSignUpRoutingModule } from './customer-sign-up-routing.module';
import { MaterialModule } from '../shared/material.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [CustomerSignUpComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatAutocompleteModule,
    CustomerSignUpRoutingModule
  ]
})
export class CustomerSignUpModule { }
