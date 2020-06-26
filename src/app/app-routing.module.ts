import { ShoppingPageComponent } from './components/shopping-page/shopping-page.component';
import { HomeComponent } from './components/home/home.component';
import { MapsComponent } from './components/maps/maps.component';
import { FoodComponent } from './components/food/food.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackorderComponent } from './components/backorder/backorder.component';
import { OrderDeliverComponent } from './components/order-deliver/order-deliver.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';


const routes: Routes = [
  { path: 'order/waiting', component: BackorderComponent},
  { path: 'order/delivered', component: OrderDeliverComponent },
  { path: 'food', component: FoodComponent },
  { path: 'order-page', component: ShoppingPageComponent },
  { path: '', component: HomeComponent },
  { path: 'back-order', component: BackorderComponent },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
