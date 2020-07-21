import { FooterComponent } from './../../components/footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterRoutingModule } from './footer-routing.module';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FooterRoutingModule
  ]
})
export class FooterModule { }
