import { Component, OnInit } from '@angular/core';
import {MakeSaleService} from '../_services/make-sale.service';

@Component({
  selector: 'app-view-sales',
  templateUrl: './view-sales.component.html',
  styleUrls: ['./view-sales.component.css']
})
export class ViewSalesComponent implements OnInit {
  users: Set<string> = new Set<string>();
  date: Date = new Date();
  sales: any[] = [];
  filteredSales: any[] = [];
  username = '';
  total = 0;
  constructor(private makeSaleService: MakeSaleService) { }

  ngOnInit(): void {
    this.getSalesBYDate();
  }

  getSalesBYDate(): void{
    this.makeSaleService.getSaleByUserAndDate(0, this.date.toLocaleDateString('en-CA')).subscribe(data => {
      data.map((sale: { postingUser: { username: string; }; }) => {this.users.add(sale.postingUser.username); });
      this.sales = data;
      this.filterSales();
    });
  }

  filterSales(): void{
    this.total = 0;
    if (this.username === '') {
      this.filteredSales = this.sales;
      this.filteredSales.map((sale: any) => {this.total += sale.price; });
      return;
    }
    this.filteredSales = this.sales.filter((sale: any) => {
      if (sale.postingUser.username === this.username){
        this.total += sale.price;
        return true;
      }
      return false;
    });
  }

}
