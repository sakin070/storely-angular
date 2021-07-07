import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../_services/category.service';
import {StockService} from '../_services/stock.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register-stock',
  templateUrl: './register-stock.component.html',
  styleUrls: ['./register-stock.component.css']
})
export class RegisterStockComponent implements OnInit {
  stock: any = {
    name: null,
    sku: null,
    category: null
  };
  categories: any[] = [];
  createStockError = false;
  constructor(private categoryService: CategoryService, private stockService: StockService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => { this.categories = data; });
  }
  createStock(form: NgForm): void{
    this.stockService.createStock(this.stock).subscribe(
        () => {
            form.resetForm();
            (document.getElementById('categoryInput') as HTMLInputElement).value = '';
            this.createStockError = false;
             },
        () => {
          this.createStockError = true;
        });
  }
  updateCategory(event: any): void{
    this.stock.category = this.categories.filter( category => category.name === event.target.value)[0];
  }
}
