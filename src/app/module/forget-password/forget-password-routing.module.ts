import { ForgotPasswordComponent } from './../../components/forgot-password/forgot-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgetPasswordRoutingModule { }
