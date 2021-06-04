import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoComponent } from './logo/logo.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MakeSaleComponent } from './make-sale/make-sale.component';
import { ViewSalesComponent } from './view-sales/view-sales.component';
import { RegisterStockComponent } from './register-stock/register-stock.component';
import { StockTableComponent } from './stock-table/stock-table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { StockPurchaseComponent } from './stock-purchase/stock-purchase.component';
import { ViewStockPurchasesComponent } from './view-stock-purchases/view-stock-purchases.component';
import { StockTransferComponent } from './stock-transfer/stock-transfer.component';
import { CategoryComponent } from './category/category.component';
import { CreateSupplierComponent } from './create-supplier/create-supplier.component';
import { ViewSuppliersComponent } from './view-suppliers/view-suppliers.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { LoyaltyManagementComponent } from './loyalty-management/loyalty-management.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoComponent,
    HomeComponent,
    NavBarComponent,
    MakeSaleComponent,
    ViewSalesComponent,
    RegisterStockComponent,
    StockTableComponent,
    PaginationComponent,
    StockPurchaseComponent,
    ViewStockPurchasesComponent,
    StockTransferComponent,
    CategoryComponent,
    CreateSupplierComponent,
    ViewSuppliersComponent,
    CreateCustomerComponent,
    ViewCustomersComponent,
    LoyaltyManagementComponent,
    NewUserComponent,
    ViewUsersComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
