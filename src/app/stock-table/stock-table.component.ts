import { Component, OnInit } from '@angular/core';
import {StockService} from '../_services/stock.service';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit {
  stocks: any[] = [];
  searchString = '';
  pageSize = 30;
  // totalPages = Infinity;
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.getPage(0); // TODO: take this out
  }
  getPage(currentPage: number): void{
    this.stockService.getStock(currentPage, this.pageSize).subscribe( data => {
      this.stocks = data;
    });
  }
  edit(index: number): void{

  }
  delete(index: number): void{

  }

}
