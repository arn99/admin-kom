import { FoodComponent } from './food/food.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackorderComponent } from './backorder/backorder.component';
import { OrderDeliverComponent } from './order-deliver/order-deliver.component';

const routes: Routes = [
  {path: 'order/waiting', component: BackorderComponent},
  {path: 'order/delivered', component: OrderDeliverComponent},
  {path: 'food', component: FoodComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
