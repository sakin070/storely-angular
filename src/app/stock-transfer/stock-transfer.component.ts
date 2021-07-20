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
    stockId: 0,
    sku: '',
    name: ''
  };
  stockList: any;
  timer: any;
  stockTransferError = false;
  transferTypeError = false;
  transferType = '';
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
  }
  transferStock(form: NgForm): void {
    if (this.transferType === 'Shelf To Store'){
      this.stockService.transferFromShelfToStore(this.stock.stockId, this.amount).subscribe(
          () => this.clearForm(form),
          () => this.stockTransferError = true
      );
    }
    else if (this.transferType === 'Store To Shelf'){
      this.stockService.transferFromStoreToShelf(this.stock.stockId, this.amount).subscribe(
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
      stockId: 0,
      sku: '',
      name: ''
    };
    this.stockTransferError = false;
    this.transferTypeError = false;
    this.transferType = '';
    form.resetForm();
  }
  getStockByName(): void{
    // if there is already a timer running... then stop it
    if (this.timer){
      clearTimeout(this.timer);
    }
    // trigger the search action after 400 millis
    this.timer = setTimeout(() => {
      this.stockService.getStockByName(this.stock.name, 0, 20)
          .subscribe(data => {
            this.stockList = data.content;
            if (this.stockList.length === 1){
              this.stock = this.stockList[0];
            }
          });
    }, 400);
  }
}
