import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../_services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryName = '';
  categoryError = false;
  showDeleteModal = false;
  categories: any[] = [];
  category: any;
  canBeDeleted = true;
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }
  hideModal(): void {
    this.showDeleteModal = false;
  }
  add(): void {
    this.categoryService.createCategory({name: this.categoryName}).subscribe( () => {
      this.getAllCategories();
      this.categoryName = '';
    });
  }
  deleteCategory(): void {
    console.log(this.canBeDeleted);
    this.categoryService.deleteCategory(this.category.categoryId).subscribe(() => {
      this.getAllCategories();
      this.hideModal();
    });
  }
  delete(index: number): void {
    this.category = this.categories[index];
    this.categoryService.getCategoryStockCount(this.category.categoryId).subscribe( data => {
      this.canBeDeleted = data === 0;
      this.showDeleteModal = true;
    });
  }
  getAllCategories(): void{
    this.categoryService.getCategories().subscribe(data => this.categories = data );
  }
}
