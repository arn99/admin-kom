import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import {FlexLayoutServerModule} from '@angular/flex-layout/server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    AppModule,
    NoopAnimationsModule,
    ServerModule,
    FlexLayoutServerModule ,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
