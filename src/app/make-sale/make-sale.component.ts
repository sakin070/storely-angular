import { Component, OnInit } from '@angular/core';
import {MakeSaleService} from '../_services/make-sale.service';
import {element} from 'protractor';

@Component({
  selector: 'app-make-sale',
  templateUrl: './make-sale.component.html',
  styleUrls: ['./make-sale.component.css']
})
export class MakeSaleComponent implements OnInit {
  sku = '';
  name = '';
  quantity = 1;
  sale: any = {
    saleItems: []
  };
  constructor(private makeSaleService: MakeSaleService) { }

  ngOnInit(): void {
  }

  pay(): void {
  }
  clearSaleItems(): void {
    this.makeSaleService.clearSaleItems().subscribe(data => {
      this.sale.saleItems = [];
    });
  }
  removeSaleItem(index: number): void {
  }
  addSaleItem(): void{
    const saleItem = this.sale.saleItems.find( (element: any) => {
      console.log(element);
      console.log(element.stock.sku === this.sku);
      if (element.stock.sku === this.sku){
        element.quantity = element.quantity + 1;
      }
      return element.stock.sku === this.sku;
    });
    if ( !saleItem){
      this.makeSaleService.getStockBySKU(this.sku).subscribe(data => {
        const tempSaleItem: any = {
          stock: {
            stock_id: data.stock_id,
            sku: data.sku,
            name: data.name,
            sellingPrice: data.sellingPrice
          },
          quantity: 1
        };
        this.sale.saleItems.push(tempSaleItem);
      });
    }

  }
}
