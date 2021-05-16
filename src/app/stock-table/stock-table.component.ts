import { Component, OnInit } from '@angular/core';
import {StockService} from '../_services/stock.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit {
  stocks: any[] = [];
  searchString = '';
  pageSize = 9;
  currentPage = new BehaviorSubject(1);
  totalPages = Infinity;
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.getPage(0); // TODO: take this out
  }
  getPage(currentPage: number): void{
    if (this.searchString === ''){
      this.stockService.getStock(currentPage, this.pageSize).subscribe( data => {
        console.log(data);
        this.stocks = data.content;
        this.totalPages = data.totalPages;
      });
    }else{
      this.stockService.getStockByName(this.searchString, currentPage, this.pageSize).subscribe( data => {
        this.stocks = data.content;
        this.totalPages = data.totalPages;
      });
    }
  }
  edit(index: number): void{

  }
  delete(index: number): void{

  }
  downloadStockTable(): void{
    this.stockService.downloadStockTable().subscribe(data => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'stock-table.pdf';
      link.click();
    });
  }

}
