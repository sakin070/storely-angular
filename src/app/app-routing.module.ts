import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {MakeSaleComponent} from './make-sale/make-sale.component';
import {ViewSalesComponent} from './view-sales/view-sales.component';
import {RegisterStockComponent} from './register-stock/register-stock.component';
import {StockTableComponent} from './stock-table/stock-table.component';
import {StockPurchaseComponent} from './stock-purchase/stock-purchase.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'make-sale', component: MakeSaleComponent},
  {path: 'view-sales', component: ViewSalesComponent},
  {path: 'register-stock', component: RegisterStockComponent},
  {path: 'stock-table', component: StockTableComponent},
  {path: 'stock-purchase', component: StockPurchaseComponent},
  {path: 'home', component: HomeComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
