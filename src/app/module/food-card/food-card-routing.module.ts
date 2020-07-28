import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodCardComponent } from 'src/app/components/food-card/food-card.component';


const routes: Routes = [
  { path: '', component: FoodCardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodCardRoutingModule { }
