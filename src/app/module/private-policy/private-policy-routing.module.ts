import { PrivatePolicyComponent } from './../../components/private-policy/private-policy.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: PrivatePolicyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivatePolicyRoutingModule { }
