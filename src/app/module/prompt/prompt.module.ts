import { PromptComponent } from './../../components/prompt-component/prompt-component.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromptRoutingModule } from './prompt-routing.module';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [PromptComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PromptRoutingModule
  ]
})
export class PromptModule { }
