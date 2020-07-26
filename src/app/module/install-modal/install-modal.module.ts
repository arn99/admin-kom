import { InstallModalComponent } from './../../components/install-modal/install-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstallModalRoutingModule } from './install-modal-routing.module';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [InstallModalComponent],
  imports: [
    CommonModule,
    MaterialModule,
    InstallModalRoutingModule
  ]
})
export class InstallModalModule { }
