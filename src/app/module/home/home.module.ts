import { PriceCalculatePipe } from './../../pipes/price.pipe';
import { FoodCardComponent } from './../../components/food-card/food-card.component';
import { HomeComponent } from './../../components/home/home.component';
import { NgModule } from '@angular/core';
import { FoodFilterPipe } from 'src/app/pipes/filter.pipe';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule, ScrollHooks } from 'ng-lazyload-image';
import { MaterialModule } from '../shared/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatCarouselModule } from '@ngmodule/material-carousel';

@NgModule({
  declarations: [HomeComponent,
                FoodCardComponent,
                FoodFilterPipe,
                PriceCalculatePipe
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    LazyLoadImageModule,
    LazyLoadImageModule.forRoot(ScrollHooks),
    MatCarouselModule.forRoot(),
    MaterialModule,
    HomeRoutingModule,
  ],

})
export class HomeModule { }
