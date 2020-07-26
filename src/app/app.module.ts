import { AboutModule } from './module/about/about.module';
import { TermModule } from './module/term/term.module';
import { SuccessModalModule } from './module/success-modal/success-modal.module';
import { SignUpModule } from './module/sign-up/sign-up.module';
import { SignInModule } from './module/sign-in/sign-in.module';
import { ShoppingPageModule } from './module/shopping-page/shopping-page.module';
import { ShopCatModalModule } from './module/shop-cat-modal/shop-cat-modal.module';
import { PromptModule } from './module/prompt/prompt.module';
import { ProgressBarModalModule } from './module/progress-bar-modal/progress-bar-modal.module';
import { PrivatePolicyModule } from './module/private-policy/private-policy.module';
import { OrderDeliverModule } from './module/order-deliver/order-deliver.module';
import { OrderPageModule } from './module/order-page/order-page.module';
import { MapsModule } from './module/maps/maps.module';
import { LoadingModule } from './module/loading/loading.module';
import { InstallModalModule } from './module/install-modal/install-modal.module';
import { HomeModule } from './module/home/home.module';
import { FoodModule } from './module/food/food.module';
import { FoodCardModule } from './module/food-card/food-card.module';
import { ExceptionModalModule } from './module/exception-modal/exception-modal.module';
import { CustomerSignUpModule } from './module/customer-sign-up/customer-sign-up.module';
import { CustomerOrderModule } from './module/customer-order/customer-order.module';
import { BackorderModule } from './module/backorder/backorder.module';
import { AddFoodModule } from './module/add-food/add-food.module';
import { AccountModule } from './module/account/account.module';
import { CheckoutFormModule } from './module/checkout-form/checkout-form.module';
import { HeaderModule } from './module/header/header.module';
import { LocalService } from './services/local.service';
import { StorageService } from './services/storage.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from './services/order.service';
import { FoodService } from './services/food.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { firebaseConfig } from './config/firebase-config';
import { AuthService } from './services/auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PwaService } from './services/pwa.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ForgetPasswordModule } from './module/forget-password/forget-password.module';
import { VerifyEmailAdressModule } from './module/verify-email-adress/verify-email-adress.module';

const initializer = (pwaService: PwaService) => () => pwaService.initPwaPrompt();

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AutocompleteLibModule,
    MatAutocompleteModule,
    HeaderModule,
    CheckoutFormModule,
    AboutModule,
    AccountModule,
    AddFoodModule,
    BackorderModule,
    CustomerOrderModule,
    CustomerSignUpModule,
    ExceptionModalModule,
    FoodCardModule,
    FoodModule,
    ForgetPasswordModule,
    HeaderModule,
    HeaderModule,
    HomeModule,
    InstallModalModule,
    LoadingModule,
    MapsModule,
    OrderPageModule,
    OrderDeliverModule,
    PrivatePolicyModule,
    ProgressBarModalModule,
    ProgressBarModalModule,
    PromptModule,
    ShopCatModalModule,
    ShoppingPageModule,
    SignInModule,
    SignUpModule,
    SuccessModalModule,
    TermModule,
    VerifyEmailAdressModule,
    /* AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvw8F1-PrDmQbMm6yzGOteQwM-4w80V5c',
    }), */
    /* AgmDirectionModule, */
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    NgbModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately'  }),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [OrderService, FoodService, AuthService, StorageService, LocalService,
    {provide: APP_INITIALIZER, useFactory: initializer, deps: [PwaService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
