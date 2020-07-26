import { ShopCartComponent } from './../../components/shop-cart-modal/shop-cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopCatModalRoutingModule } from './shop-cat-modal-routing.module';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [ShopCartComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ShopCatModalRoutingModule
  ]
})
export class ShopCatModalModule { }
