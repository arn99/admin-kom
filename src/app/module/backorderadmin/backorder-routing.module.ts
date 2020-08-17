import { BackOrdesAdminComponent } from './../../components/back-ordes-admin/back-ordes-admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: BackOrdesAdminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackorderAdminRoutingModule { }
