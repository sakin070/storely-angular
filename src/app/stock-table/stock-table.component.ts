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
  totalPages = new BehaviorSubject(Infinity);
  constructor(private stockService: StockService) { }

  ngOnInit(): void {}
  search(): void{
    this.getPage(1);
    this.currentPage.next(1);
  }
  getPage = (currentPage: number): void => {
    if (this.searchString === ''){
      this.stockService.getStock(currentPage - 1, this.pageSize).subscribe( data => {
        this.stocks = data.content;
        this.totalPages.next( data === [] ? 1 : data.totalPages);
        console.log(data);
      });
    }else{
      this.stockService.getStockByName(this.searchString, currentPage - 1, this.pageSize).subscribe( data => {
        this.stocks = data.content;
        this.totalPages.next( data === [] ? 1 : data.totalPages);
        console.log(data);
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
