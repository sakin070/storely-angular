import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ExpenseService} from '../_services/expense.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  currentUserId = 0;
  viewExpenses = true;
  newExpense = true;
  expenses: any[] = [];
  categories: any[] = [];
  expense: any = {
    id: 0,
    amount: 0,
    expenseCategory: {
      name: ''
    },
    dateEntered: '',
    description: '',
    postingUser: {
      id: 0
    }
  };
  descriptionString = '';
  pageSize = 9;
  currentPage = new BehaviorSubject(1);
  totalPages = new BehaviorSubject(1);
  constructor(private expenseService: ExpenseService, private tokenService: TokenStorageService) {
    this.currentUserId = tokenService.getUser().id;
    this.expenseService.getAllExpenseCategories().subscribe(data => this.categories = data);
  }

  ngOnInit(): void {
  }
  edit(index: number): void{
    this.expense = this.expenses[index];
    this.viewExpenses = false;
    this.newExpense = false;
  }
  back(): void{
    this.viewExpenses = true;
  }
  getPage = (currentPage: number): void => {
    if (this.descriptionString === ''){
      this.expenseService.getExpensePage(currentPage - 1, this.pageSize).subscribe( data => {
        this.expenses = data.content;
        this.totalPages.next( data === [] ? 1 : data.totalPages);
      });
    }else{
      this.expenseService.getExpensesByDescription(this.descriptionString, currentPage - 1, this.pageSize).subscribe( data => {
        this.expenses = data.content;
        this.totalPages.next( data === [] ? 1 : data.totalPages);
      });
    }
  }
  saveExpense(): void{
    this.expenseService.createExpense(this.expense).subscribe(() => {
      this.getPage(this.currentPage.value);
      this.back();
    });
  }
  updateCategory(event: any): void{
    this.expense.expenseCategory = this.categories.filter( category => category.name === event.target.value)[0];
  }
  showNewExpense(): void{
    this.viewExpenses = false;
    this.newExpense = true;
  }
  search(): void{
    this.getPage(1);
    this.currentPage.next(1);
  }
}
