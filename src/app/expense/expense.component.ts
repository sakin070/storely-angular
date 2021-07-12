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
  currentUserId = -1;
  viewExpenses = true;
  newExpense = true;
  showFilter = false;
  showDeleteModal = false;
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
  date = '';
  categoryName = '';
  pageSize = 9;
  currentPage = new BehaviorSubject(1);
  totalPages = new BehaviorSubject(1);
  idToBeDeleted = 0;
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
      this.expenseService.getExpensesByDescription(this.descriptionString, this.date, this.categoryName, currentPage - 1, this.pageSize).subscribe( data => {
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
  hideFilter(): void{
    this.showFilter = false;
  }
  clickFilter(): void{
    this.showFilter = true;
  }
  filter(): void{
    this.expenseService.getExpensesByDescription(this.descriptionString, this.date, this.categoryName, 0, this.pageSize).subscribe( data => {
      this.expenses = data.content;
      this.totalPages.next( data === [] ? 1 : data.totalPages);
      this.currentPage.next(1);
      this.hideFilter();
    });
  }
  hideDeleteModal(): void{
    this.showDeleteModal = false;
  }
  showDelete(id: number): void{
    this.idToBeDeleted = id;
    this.showDeleteModal = true;
  }
  deleteExpense(): void{
    this.expenseService.deleteExpense(this.expenses[this.idToBeDeleted].id).subscribe(() => {
      this.getPage(this.currentPage.value);
      this.hideDeleteModal();
    });
  }
}
