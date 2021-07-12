import { Component, OnInit } from '@angular/core';
import {ExpenseService} from '../_services/expense.service';

@Component({
  selector: 'app-expense-category',
  templateUrl: './expense-category.component.html',
  styleUrls: ['./expense-category.component.css']
})
export class ExpenseCategoryComponent implements OnInit {
  showDeleteModal = false;
  categories: any[] = [];
  categoryName = '';
  canBeDeleted = false;
  category: any;

  constructor(private expenseService: ExpenseService) {
    this.getCategories();
  }

  getCategories(): void{
    this.expenseService.getAllExpenseCategories().subscribe(data => this.categories = data);
  }
  ngOnInit(): void {
  }
  hideModal(): void {
    this.showDeleteModal = false;
  }
  delete(index: number): void {
    this.category = this.categories[index];
    this.expenseService.categoryHasExpense(this.category.id).subscribe(data => {
      this.canBeDeleted = data !== 'true';
      this.showDeleteModal = true;
    });
  }
  deleteCategory(): void {
    this.expenseService.deleteExpenseCategory(this.category.id).subscribe(() => {
      this.getCategories();
      this.hideModal();
    });
  }
  add(): void{
    this.expenseService.createExpenseCategory({name: this.categoryName}).subscribe(() => {
      this.categoryName = '';
      this.getCategories();
    });
  }
}
