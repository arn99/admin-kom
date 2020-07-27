import { PriceCalculatePipe } from './../../pipes/price.pipe';
import { FoodCardComponent } from './../../components/food-card/food-card.component';
import { HomeComponent } from './../../components/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FoodFilterPipe } from '../../pipes/filter.pipe';
import { MaterialModule } from '../shared/material.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import {MatMenuModule} from '@angular/material/menu';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [HomeComponent,
                FoodCardComponent,
                FoodFilterPipe,
                PriceCalculatePipe
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    CarouselModule,
    MatCarouselModule.forRoot(),
    MaterialModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
