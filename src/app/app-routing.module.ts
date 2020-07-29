import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren : () => import('./module/home/home.module').then(m => m.HomeModule), // new dynamic import method
  },
  {
    path: 'order/waiting',
    loadChildren : () => import('./module/backorder/backorder.module').then(m => m.BackorderModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'order/deliverer',
    loadChildren : () => import('./module/order-deliver/order-deliver.module').then(m => m.OrderDeliverModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'food',
    loadChildren : () => import('./module/food/food.module').then(m => m.FoodModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'order-page',
    loadChildren : () => import('./module/shopping-page/shopping-page.module').then(m => m.ShoppingPageModule), // new dynamic import method
  },
  // { path: '', component: HomeComponent },
  { path: 'account',
  loadChildren : () => import('./module/account/account.module').then(m => m.AccountModule)
  },
  { path: 'my-order',
    loadChildren : () => import('./module/customer-order/customer-order.module').then(m => m.CustomerOrderModule),
    },
  { path: 'back-order',
  loadChildren : () => import('./module/backorder/backorder.module').then(m => m.BackorderModule),
  canActivate: [AuthGuard] },
  /* { path: '', redirectTo: '/sign-in', pathMatch: 'full' }, */
  { path: 'sign-in',
  loadChildren : () => import('./module/sign-in/sign-in.module').then(m => m.SignInModule), },
  { path: 'term',
  loadChildren : () => import('./module/term/term.module').then(m => m.TermModule),  },
  { path: 'private-policy',
  loadChildren : () => import('./module/private-policy/private-policy.module').then(m => m.PrivatePolicyModule), },
  { path: 'about',
  loadChildren : () => import('./module/about/about.module').then(m => m.AboutModule), },
  { path: 'sign-up-resto',
  loadChildren : () => import('./module/sign-up/sign-up.module').then(m => m.SignUpModule),
  canActivate: [AuthGuard] },
  { path: 'sign-up',
  loadChildren : () => import('./module/customer-sign-up/customer-sign-up.module').then(m => m.CustomerSignUpModule),
  },
  { path: 'register-user',
  loadChildren : () => import('./module/sign-up/sign-up.module').then(m => m.SignUpModule),
  },
  { path: 'forgot-password',
  loadChildren : () => import('./module/forget-password/forget-password.module').then(m => m.ForgetPasswordModule),
  },
  { path: 'verify-email-address',
  loadChildren : () => import('./module/verify-email-adress/verify-email-adress.module').then(m => m.VerifyEmailAdressModule),
  },
  { path: '404',
  loadChildren : () => import('./module/not-found/not-found.module').then(m => m.NotFoundModule),
  },
 {path: '**', redirectTo: '/404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
