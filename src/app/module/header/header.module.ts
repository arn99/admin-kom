import { FooterComponent } from './../../components/footer/footer.component';
import { HomeModule } from './../home/home.module';
import { HeaderComponent } from './../../components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderRoutingModule } from './header-routing.module';
import { MaterialModule } from '../shared/material.module';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {BottomNavModule} from 'ngx-bottom-nav';
import {MatMenuModule} from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [
      FooterComponent,
      HeaderComponent,
  ],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    BottomNavModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatBadgeModule,
    MaterialModule,
    HomeModule,
    MatToolbarModule,
    HeaderRoutingModule
  ]
})
export class HeaderModule { }
