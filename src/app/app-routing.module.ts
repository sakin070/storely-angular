import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {MakeSaleComponent} from './make-sale/make-sale.component';
import {ViewSalesComponent} from './view-sales/view-sales.component';
import {RegisterStockComponent} from './register-stock/register-stock.component';
import {StockTableComponent} from './stock-table/stock-table.component';
import {StockPurchaseComponent} from './stock-purchase/stock-purchase.component';
import {ViewStockPurchasesComponent} from './view-stock-purchases/view-stock-purchases.component';
import {StockTransferComponent} from './stock-transfer/stock-transfer.component';
import {CategoryComponent} from './category/category.component';
import {CreateSupplierComponent} from './create-supplier/create-supplier.component';
import {ViewSuppliersComponent} from './view-suppliers/view-suppliers.component';
import {CreateCustomerComponent} from './create-customer/create-customer.component';
import {ViewCustomersComponent} from './view-customers/view-customers.component';
import {LoyaltyManagementComponent} from './loyalty-management/loyalty-management.component';
import {NewUserComponent} from './new-user/new-user.component';
import {ViewUsersComponent} from './view-users/view-users.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'make-sale', component: MakeSaleComponent},
  {path: 'view-sales', component: ViewSalesComponent},
  {path: 'new-supplier', component: CreateSupplierComponent},
  {path: 'view-users', component: ViewUsersComponent},
  {path: 'new-user', component: NewUserComponent},
  {path: 'view-suppliers', component: ViewSuppliersComponent},
  {path: 'new-customer', component: CreateCustomerComponent},
  {path: 'view-customers', component: ViewCustomersComponent},
  {path: 'register-stock', component: RegisterStockComponent},
  {path: 'stock-table', component: StockTableComponent},
  {path: 'stock-transfer', component: StockTransferComponent},
  {path: 'new-stock-purchase', component: StockPurchaseComponent},
  {path: 'view-stock-purchases', component: ViewStockPurchasesComponent},
  {path: 'loyalty-management', component: LoyaltyManagementComponent},
  {path: 'home', component: HomeComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
