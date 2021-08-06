import { Component, OnInit } from '@angular/core';
import {KpiService} from '../_services/kpi.service';
import {formatDate} from '@angular/common';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-store-evaluation',
  templateUrl: './store-evaluation.component.html',
  styleUrls: ['./store-evaluation.component.css']
})
export class StoreEvaluationComponent implements OnInit {
  homeAnalytics = {
    inventoryValuation: 0,
    profits: 0,
    inventoryTurnover: 0,
    GMROI: 0
  };
  overview = true;
  showCategories = true;
  categories: any[] = [];
  products: any[] = [];
  endDate: string = formatDate(new Date() , 'yyyy-MM-dd', 'en-CA');
  startDate: string = formatDate(new Date().setDate(new Date().getDate() - 30) , 'yyyy-MM-dd', 'en-CA');
  pageSize = 9;
  currentPage = new BehaviorSubject(1);
  totalPages = new BehaviorSubject(1);
  currentPageProduct = new BehaviorSubject(1);
  totalPagesProduct = new BehaviorSubject(1);

  constructor(private kpiService: KpiService) { }

  ngOnInit(): void {
    this.getStoreData();
  }

  getPageOfCategories = (currentPage: number): void => {
    this.kpiService.getPageCategoryKPI(currentPage - 1, this.pageSize, this.startDate, this.endDate).subscribe(data => {
      this.categories = data.content;
      this.totalPages.next( data === [] ? 1 : data.totalPages);
    });
  }
  getPageOfProducts = (currentPage: number): void => {
    this.kpiService.getPageProductKPI(currentPage - 1, this.pageSize, this.startDate, this.endDate).subscribe(data => {
      this.products = data.content;
      this.totalPagesProduct.next( data === [] ? 1 : data.totalPages);
    });
  }
  getStoreData(): void{
    this.kpiService.getStoreKPI(this.startDate, this.endDate).subscribe(data => {
      this.homeAnalytics = data;
    });
  }
  getCategoryData(): void{
    this.getPageOfCategories(1);
  }
  getProductData(): void{
    this.getPageOfProducts(1);
  }
  showOverview(): void{
    this.overview = true;
  }
  clickShowCategories(): void{
    this.overview = false;
    this.showCategories = true;
  }
  showProducts(): void{
    this.overview = false;
    this.showCategories = false;
  }
}
