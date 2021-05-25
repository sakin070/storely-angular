import { Component, OnInit } from '@angular/core';
import {StockService} from '../_services/stock.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-stock-transfer',
  templateUrl: './stock-transfer.component.html',
  styleUrls: ['./stock-transfer.component.css']
})
export class StockTransferComponent implements OnInit {
  amount = NaN;
  stock = {
    stock_id: 0,
    sku: '',
    name: ''
  };
  stockTransferError = false;
  transferTypeError = false;
  transferType = '';
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
  }
  transferStock(form: NgForm): void {
    if (this.transferType === 'Shelf To Store'){
      this.stockService.transferFromShelfToStore(this.stock.stock_id, this.amount).subscribe(
          () => this.clearForm(form),
          () => this.stockTransferError = true
      );
    }
    else if (this.transferType === 'Store To Shelf'){
      this.stockService.transferFromStoreToShelf(this.stock.stock_id, this.amount).subscribe(
          () =>  this.clearForm(form),
          () => this.stockTransferError = true
      );
    }else{
      this.transferTypeError = true;
    }
  }
  getStockBySKU(): void{
    this.stockService.getStockBySKU(this.stock.sku).subscribe(data => {
      if (data !== null){
        this.stock = data;
      }
    });
  }
  clearForm(form: NgForm): void{
    this.amount = NaN;
    this.stock = {
      stock_id: 0,
      sku: '',
      name: ''
    };
    this.stockTransferError = false;
    this.transferTypeError = false;
    this.transferType = '';
    form.resetForm();
  }
}
