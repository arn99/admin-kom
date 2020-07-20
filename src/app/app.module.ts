import { FoodFilterPipe } from './pipes/filter.pipe';
import { LocalService } from './services/local.service';
import { StorageService } from './services/storage.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackorderComponent } from './components/backorder/backorder.component';
import { OrderDeliverComponent } from './components/order-deliver/order-deliver.component';
import { HeaderComponent } from './components/header/header.component';
import { FoodComponent } from './components/food/food.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from './services/order.service';
import { FoodService } from './services/food.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { MapsComponent } from './components/maps/maps.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from './config/firebase-config';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthService } from './services/auth.service';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatOptionModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { LoadingComponent } from './components/loading/loading.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { ShoppingPageComponent } from './components/shopping-page/shopping-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShopCartComponent } from './components/shop-cart-modal/shop-cart.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { SuccessModalComponent } from './components/success-modal/success-modal.component';
import {BottomNavModule} from 'ngx-bottom-nav';
import { CustomerOrderComponent } from './components/customer-order/customer-order.component';
import { AccountComponent } from './components/account/account.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { ProgessBarModalComponent } from './components/progess-bar-modal/progess-bar-modal.component';
import { CustomerSignUpComponent } from './components/customer-sign-up/customer-sign-up.component';
import { AboutComponent } from './components/about/about.component';
import { FoodCardComponent } from './components/food-card/food-card.component';
import { PriceCalculatePipe } from './pipes/price.pipe';
import { PrivatePolicyComponent } from './components/private-policy/private-policy.component';
import { TermComponent } from './components/term/term.component';
import { ExceptionModalComponent } from './components/exception-modal/exception-modal.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LazyLoadImageModule, ScrollHooks } from 'ng-lazyload-image';
import { InstallModalComponent } from './components/install-modal/install-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    FoodFilterPipe,
    PriceCalculatePipe,
    BackorderComponent,
    OrderDeliverComponent,
    HeaderComponent,
    FoodComponent,
    MapsComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    AddFoodComponent,
    LoadingComponent,
    HomeComponent,
    FooterComponent,
    ShopCartComponent,
    ShoppingPageComponent,
    CheckoutFormComponent,
    SuccessModalComponent,
    CustomerOrderComponent,
    AccountComponent,
    ProgressBarComponent,
    ProgessBarModalComponent,
    CustomerSignUpComponent,
    AboutComponent,
    FoodCardComponent,
    PrivatePolicyComponent,
    TermComponent,
    ExceptionModalComponent,
    InstallModalComponent,
  ],
  imports: [
    LazyLoadImageModule.forRoot(ScrollHooks),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BottomNavModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    MatMenuModule,
    MatListModule,
    FlexLayoutModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatSlideToggleModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCarouselModule.forRoot(),
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
  providers: [OrderService, FoodService, AuthService, StorageService, LocalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
