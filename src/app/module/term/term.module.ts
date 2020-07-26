import { TermComponent } from './../../components/term/term.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermRoutingModule } from './term-routing.module';


@NgModule({
  declarations: [TermComponent],
  imports: [
    CommonModule,
    TermRoutingModule
  ]
})
export class TermModule { }
