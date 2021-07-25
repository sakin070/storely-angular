import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import {KpiService} from '../_services/kpi.service';
import {ExpenseService} from '../_services/expense.service';

@Component({
  selector: 'app-balance-sheet-report',
  templateUrl: './balance-sheet-report.component.html',
  styleUrls: ['./balance-sheet-report.component.css']
})
export class BalanceSheetReportComponent implements OnInit {
  endDate: string = formatDate(new Date() , 'yyyy-MM-dd', 'en-CA');
  startDate: string = formatDate(new Date().setDate(new Date().getDate() - 30) , 'yyyy-MM-dd', 'en-CA');
  incomeBreakdown: any = {
    cogs: 0,
    grossProfit: 0,
    income: 0
  };
  expensesByGroup: any[] = [];
  grossProfitPercent = '';
  totalOperatingExpense = 0;
  netProfit = 0;
  netProfitPercentage = '';
  constructor(private kpiService: KpiService, private expenseService: ExpenseService ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.kpiService.getIncomeBreakdown(this.startDate, this.endDate).subscribe(data => {
      this.incomeBreakdown = data;
      this.grossProfitPercent = ( (this.incomeBreakdown.grossProfit / this.incomeBreakdown.income ) * 100).toFixed(2);
      this.totalOperatingExpense = 0;
      this.expenseService.getAllExpensesByGroup(this.startDate, this.endDate).subscribe( exp => {
        this.expensesByGroup = exp;
        this.expensesByGroup.forEach( expense => this.totalOperatingExpense = this.totalOperatingExpense + expense.groupAmount);
        this.netProfit = this.incomeBreakdown.income - this.incomeBreakdown.cogs - this.totalOperatingExpense;
        this.netProfitPercentage = ( (this.netProfit / this.incomeBreakdown.income ) * 100).toFixed(2);
      });
    });
  }

  downloadBalanceSheet(): void {
    this.kpiService.downloadBalanceSheet(this.startDate, this.endDate).subscribe(
      data => {
        const downloadURL = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'BalanceSheet.pdf';
        link.click();
      }
    );
  }
}
