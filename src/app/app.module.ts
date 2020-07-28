
import { ForgetPasswordModule } from './module/forget-password/forget-password.module';
import { ShopCatModalModule } from './module/shop-cat-modal/shop-cat-modal.module';
import { PwaService } from './services/pwa.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {  NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './module/header/header.module';
import { AboutModule } from './module/about/about.module';
import { AccountModule } from './module/account/account.module';
import { AddFoodModule } from './module/add-food/add-food.module';
import { BackorderModule } from './module/backorder/backorder.module';
import { CheckoutFormModule } from './module/checkout-form/checkout-form.module';
import { CustomerOrderModule } from './module/customer-order/customer-order.module';
import { CustomerSignUpModule } from './module/customer-sign-up/customer-sign-up.module';
import { ExceptionModalModule } from './module/exception-modal/exception-modal.module';
import { FoodCardModule } from './module/food-card/food-card.module';
import { FoodModule } from './module/food/food.module';
import { FooterModule } from './module/footer/footer.module';
import { HomeModule } from './module/home/home.module';
import { InstallModalModule } from './module/install-modal/install-modal.module';
import { LoadingModule } from './module/loading/loading.module';
import { MapsModule } from './module/maps/maps.module';
import { OrderPageModule } from './module/order-page/order-page.module';
import { OrderDeliverModule } from './module/order-deliver/order-deliver.module';
import { PrivatePolicyModule } from './module/private-policy/private-policy.module';
import { ProgressBarModalModule } from './module/progress-bar-modal/progress-bar-modal.module';
import { ProgressBarModule } from './module/progress-bar/progress-bar.module';
import { PromptModule } from './module/prompt/prompt.module';
import { ShoppingPageModule } from './module/shopping-page/shopping-page.module';
import { SuccessModalModule } from './module/success-modal/success-modal.module';
import { TermModule } from './module/term/term.module';
import { VerifyEmailAdressModule } from './module/verify-email-adress/verify-email-adress.module';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from './config/firebase-config';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { OrderService } from './services/order.service';
import { FoodService } from './services/food.service';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { LocalService } from './services/local.service';

const initializer = (pwaService: PwaService) => () => pwaService.initPwaPrompt();

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    HeaderModule,
    AboutModule,
    AccountModule,
    AddFoodModule,
    BackorderModule,
    CheckoutFormModule,
    CustomerOrderModule,
    CustomerSignUpModule,
    ExceptionModalModule,
    FoodCardModule,
    FoodModule,
    FooterModule,
    ForgetPasswordModule,
    HomeModule,
    InstallModalModule,
    LoadingModule,
    MapsModule,
    OrderPageModule,
    OrderDeliverModule,
    PrivatePolicyModule,
    ProgressBarModalModule,
    ProgressBarModule,
    PromptModule,
    ShopCatModalModule,
    ShoppingPageModule,
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
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately'  }),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [OrderService, FoodService, AuthService, StorageService, LocalService,
    {provide: APP_INITIALIZER, useFactory: initializer, deps: [PwaService], multi: true},
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

