import { BackOrdesAdminComponent } from './../../components/back-ordes-admin/back-ordes-admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackorderAdminRoutingModule } from './backorder-routing.module';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [BackOrdesAdminComponent],
  imports: [
    CommonModule,
    MaterialModule,
    BackorderAdminRoutingModule
  ]
})
export class BackorderAdminModule { }
