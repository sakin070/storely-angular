import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import {StockService} from '../_services/stock.service';
import {SupplierService} from '../_services/supplier.service';
import {StockPurchaseService} from '../_services/stock-purchase.service';

@Component({
  selector: 'app-stock-purchase',
  templateUrl: './stock-purchase.component.html',
  styleUrls: ['./stock-purchase.component.css']
})
export class StockPurchaseComponent implements OnInit {
  suppliers: any[] = [];
  supplier: any;
  purchases: any[] = [];
  date: string = formatDate(new Date() , 'yyyy-MM-dd', 'en-CA');
  stock = {
    stockId: 0,
    name: '',
    sku: '',
    shelfQuantity: NaN,
    storeQuantity: NaN,
    sellingPrice: NaN,
    costPrice: NaN,
  };
  shelfQuantity = NaN;
  storeQuantity = NaN;
  newCostPrice = NaN;
  newSellingPrice = NaN;
  reorderLevel =  NaN;
  preview = true;
  isEdit = false;
  constructor(
      private stockService: StockService, private supplierService: SupplierService, private stockPurchaseService: StockPurchaseService) { }
  // TODO: make name input behave like a type ahead
  ngOnInit(): void {
    this.supplierService.getSupplier().subscribe(data => this.suppliers = data);
  }
  getStockBySKU(): void{
    this.stockService.getStockBySKU(this.stock.sku).subscribe(data => {
      this.stock = data;
    });
  }
  add(): void{
    if ( this.stock.name !== ''){
      this.purchases.push({
            stock: JSON.parse(JSON.stringify(this.stock)),
            shelfQuantityPurchased: this.shelfQuantity,
            storeQuantityPurchased: this.storeQuantity,
            costPrice: this.newCostPrice,
            sellingPrice: this.newSellingPrice,
            reorderLevel: this.reorderLevel,
      });
      this.clearForm();
    }
  }
  updateSupplier(event: any): void{
    this.supplier = this.suppliers.filter( supplier => supplier.name === event.target.value)[0];
  }
  edit(index: number): void{
    this.isEdit = true;
    this.back();
    const purchase = this.purchases[index];
    this.stock = purchase.stock;
    this.shelfQuantity = purchase.shelfQuantityPurchased;
    this.storeQuantity = purchase.storeQuantityPurchased;
    this.newCostPrice = purchase.costPrice;
    this.newSellingPrice = purchase.sellingPrice;
    this.reorderLevel =  purchase.reorderLevel;
    this.delete(index);
  }
  delete(index: number): void{
    this.purchases.splice(index, 1);
  }
  save(): void{
    this.add();
    this.isEdit = false;
  }
  post(): void{
    this.stockPurchaseService.createStockPurchase({
      stockPurchaseItems: this.purchases,
      purchaseDate: this.date,
      supplier: this.supplier,
      totalCost: this.purchases.reduce((a, b) => a + b.costPrice, 0)
    }).subscribe(() => {
      this.clearPurchaseItems();
      this.back();
      this.supplier = {};
    });
  }
  clearPurchaseItems(): void{
    this.purchases = [];
  }
  view(): void{
    this.preview = false;
  }
  back(): void{
    this.preview = true;
  }
  clearForm(): void{
    this.stock.sku = '';
    this.stock.name = '';
    this.stock.shelfQuantity = NaN;
    this.stock.storeQuantity = NaN;
    this.stock.sellingPrice = NaN;
    this.stock.costPrice = NaN;
    this.reorderLevel = NaN;
    this.shelfQuantity =  NaN;
    this.storeQuantity = NaN;
    this.newCostPrice = NaN;
    this.newSellingPrice = NaN;
  }
}
