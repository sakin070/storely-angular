import { Component, OnInit } from '@angular/core';
import {SupplierService} from '../_services/supplier.service';
import {formatDate} from '@angular/common';
import {StockPurchaseService} from '../_services/stock-purchase.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-view-stock-purchases',
  templateUrl: './view-stock-purchases.component.html',
  styleUrls: ['./view-stock-purchases.component.css']
})
export class ViewStockPurchasesComponent implements OnInit {
  showPurchases = true;
  supplier: any;
  suppliers: any[] = [];
  purchases: any[] = [];
  purchase: any;
  endDate: string = formatDate(new Date() , 'yyyy-MM-dd', 'en-CA');
  startDate: string = formatDate(new Date().setDate(new Date().getDate() - 30) , 'yyyy-MM-dd', 'en-CA');
  pageSize = 9;
  currentPage = new BehaviorSubject(1);
  totalPages = new BehaviorSubject(Infinity);
  constructor(private supplierService: SupplierService, private stockPurchaseService: StockPurchaseService) { }

  ngOnInit(): void {
    this.supplierService.getSupplier().subscribe(data => this.suppliers = data);
  }

  getPage = (currentPage: number): void => {
    if (this.supplier === undefined || this.supplier.name === ''){
      this.stockPurchaseService.getPurchases(currentPage - 1, this.pageSize, this.startDate, this.endDate).subscribe(data => {
        this.purchases = data.content;
        this.totalPages.next( data === [] ? 1 : data.totalPages);
      });
    }else{
      console.log(this.supplier);
      this.stockPurchaseService.getPurchasesBySupplierId(
          currentPage - 1, this.pageSize, this.startDate, this.endDate, this.supplier.supplierId).subscribe( data => {
        this.purchases = data.content;
        console.log(data);
        this.totalPages.next( data === [] ? 1 : data.totalPages);
      });
    }
  }
  showPurchaseItems(index: number): void{
    this.purchase = this.purchases[index];
    this.showPurchases = false;
  }
  updateSupplier(event: any): void{
    this.supplier = this.suppliers.filter( supplier => supplier.name === event.target.value)[0];
    this.getPage(1);
  }
  back(): void{
    this.showPurchases = true;
  }
}
