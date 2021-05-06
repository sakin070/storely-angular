import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoComponent } from './logo/logo.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MakeSaleComponent } from './make-sale/make-sale.component';
import { ViewSalesComponent } from './view-sales/view-sales.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoComponent,
    HomeComponent,
    NavBarComponent,
    MakeSaleComponent,
    ViewSalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
