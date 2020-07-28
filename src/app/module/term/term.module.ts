import { TermComponent } from './../../components/term/term.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermRoutingModule } from './term-routing.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [TermComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatCarouselModule.forRoot(),
    TermRoutingModule
  ]
})
export class TermModule { }
