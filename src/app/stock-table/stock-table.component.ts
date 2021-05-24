import { Component, OnInit } from '@angular/core';
import {StockService} from '../_services/stock.service';
import {BehaviorSubject} from 'rxjs';
import {CategoryService} from '../_services/category.service';

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
  totalPages = new BehaviorSubject(1);
  stock = {
    stock_id: 0,
    name: '',
    sku: '',
    category: {name: ''},
    shelfQuantity: 0,
    storeQuantity: 0,
    sellingPrice: 0,
    reOrderLevel: 0
  };
  reason = '';
  categories: any[] = [];
  stockTable = true;
  showDeleteModal = false;
  index = 0;
  constructor(private stockService: StockService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => { this.categories = data; });
  }
  search(): void{
    this.getPage(1);
    this.currentPage.next(1);
  }
  getPage = (currentPage: number): void => {
    if (this.searchString === ''){
      this.stockService.getStock(currentPage - 1, this.pageSize).subscribe( data => {
        this.stocks = data.content;
        this.totalPages.next( data === [] ? 1 : data.totalPages);
      });
    }else{
      this.stockService.getStockByName(this.searchString, currentPage - 1, this.pageSize).subscribe( data => {
        this.stocks = data.content;
        this.totalPages.next( data === [] ? 1 : data.totalPages);
      });
    }
  }
  edit(index: number): void{
    this.stockTable = false;
    this.stock = this.stocks[index];
  }
  delete(index: number): void{
    this.stock = this.stocks[index];
    this.showDeleteModal = true;
    this.index = index;
  }
  deleteStock(): void{
    this.stockService.deleteStock(this.stock.stock_id).subscribe(() => {
      this.showDeleteModal = false;
      this.currentPage.subscribe(value => {
        this.getPage(value);
      }).unsubscribe();
    } );
  }
  hideModal(): void{
    this.showDeleteModal = false;
  }
  save(): void{
    this.stockService.modifyStock({stockBeingModified: this.stock, modificationReason: this.reason}).subscribe(
        () => this.stockTable = true);
  }
  back(): void{
    this.stockTable = true;
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
  updateCategory(event: any): void{
    this.stock.category = this.categories.filter( category => category.name === event.target.value)[0];
  }
}
