import { Component, OnInit } from '@angular/core';
import {MakeSaleService} from '../_services/make-sale.service';

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
  loyaltyCard = '';
  pointsAvailable = 0;
  usePoints = 0;
  discountCode = '';
  total = 0;
  cash = 0;
  change = 0;
  constructor(private makeSaleService: MakeSaleService) { }

  ngOnInit(): void {
  }

  pay(): void {
  }
  complete(): void {
  }
  back(): void {
  }
  clearSaleItems(): void {
    this.makeSaleService.clearSaleItems().subscribe(() => {
      this.sale.saleItems = [];
    });
  }
  removeSaleItem(index: number): void {
    if (this.sale.saleItems[index].quantity === 1){
      this.sale.saleItems.splice(index);
    }else{
      this.sale.saleItems[index].quantity = this.sale.saleItems[index].quantity - 1 ;
    }
  }
  addSaleItem(): void{
    const saleItem = this.sale.saleItems.find( (element: any) => {
      if (element.stock.sku === this.sku){
        element.quantity = element.quantity + this.quantity;
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
          quantity: this.quantity
        };
        this.sale.saleItems.push(tempSaleItem);
      });
    }
    this.sku = '';
    this.name = '';
    this.quantity = 1;
  }
}
