import { CheckoutFormComponent } from './../../components/checkout-form/checkout-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutFormRoutingModule } from './checkout-form-routing.module';
import { MaterialModule } from '../shared/material.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [CheckoutFormComponent],
  imports: [
    CommonModule,
    AutocompleteLibModule,
    MatAutocompleteModule,
    MaterialModule,
    CheckoutFormRoutingModule
  ],
  exports: [
    AutocompleteLibModule,
    MatAutocompleteModule,
  ]
})
export class CheckoutFormModule { }
