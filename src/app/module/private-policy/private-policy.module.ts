import { PrivatePolicyComponent } from './../../components/private-policy/private-policy.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivatePolicyRoutingModule } from './private-policy-routing.module';


@NgModule({
  declarations: [PrivatePolicyComponent],
  imports: [
    CommonModule,
    PrivatePolicyRoutingModule
  ]
})
export class PrivatePolicyModule { }
