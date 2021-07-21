import { Component, OnInit } from '@angular/core';
import {StockService} from '../_services/stock.service';
import {formatDate} from '@angular/common';
import {BehaviorSubject} from 'rxjs';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-stock-history',
  templateUrl: './stock-history.component.html',
  styleUrls: ['./stock-history.component.css']
})
export class StockHistoryComponent implements OnInit {
  showFilter = false;
  timer: any;
  stock = {
    stockId: 0,
    name: 'A GIVEN PRODUCT00',
    category: {
      categoryId: 0,
      name: 'category0',
      active: true
    },
    shelfQuantity: 50,
    storeQuantity: 50,
    costPrice: 100,
    sellingPrice: 15,
    reorderLevel: 10,
    active: true,
    sku: '000000000'
  };
  user = {id: 0};
  type = '';
  stockName = '';
  username = '';
  histories: any[] = [];
  stocks: any[] = [];
  users: any[] = [];
  endDate: string = formatDate(new Date() , 'yyyy-MM-dd', 'en-CA');
  startDate: string = formatDate(new Date().setDate(new Date().getDate() - 30) , 'yyyy-MM-dd', 'en-CA');
  pageSize = 9;
  currentPage = new BehaviorSubject(1);
  totalPages = new BehaviorSubject(1);
  constructor(private stockService: StockService, private userService: UserService) { }

  ngOnInit(): void {
  }
  getPage = (currentPage: number): void => {
    this.stockService.getStockHistory(currentPage - 1, this.pageSize, this.startDate, this.endDate,
      this.stock.stockId, this.user.id, this.type).subscribe(data => {
        this.histories = data.content;
        this.totalPages.next( data === [] ? 1 : data.totalPages);
    });
  }
  getStocks(): void{
    if (this.timer){
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.stockService.getStockByName(this.stockName, 0, 15)
        .subscribe(data => {
          this.stocks = data.content;
          if (this.stocks.length === 1){
            this.stock = this.stocks[0];
            this.stocks = [];
          }
        });
    }, 400);
  }
  getUsers(): void{
    if (this.timer){
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.userService.getUsersByUsername(this.username, 0, 15)
        .subscribe(data => {
          this.users = data.content;
          if (this.users.length === 1){
            this.user = this.users[0];
            this.users = [];
          }
        });
    }, 400);
  }
  filter(): void{
    this.getPage(1);
  }
  search(): void{
    this.filter();
    this.hideFilter();
  }
  hideFilter(): void{
    this.showFilter = false;
  }
  showFilterDialogue(): void{
    this.showFilter = true;
  }
}
