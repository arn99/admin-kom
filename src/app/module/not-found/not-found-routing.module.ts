import { NotFoundComponent } from './../../components/not-found/not-found.component';
import { OrderDeliverComponent } from './../../components/order-deliver/order-deliver.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoundModuleModule { }
