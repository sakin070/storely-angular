import { Component, OnInit } from '@angular/core';
import {DiscountService} from '../_services/discount.service';
import {BehaviorSubject} from 'rxjs';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {
  discounts: any[] = [];
  discount = {
    id: 0,
    type: 'FLAT',
    code: '',
    value: NaN,
    startDate: '',
    endDate: ''
  };
  usedCode = false;
  showDeleteModal = false;
  viewDiscounts = true;
  newDiscount = true;
  endDate: string = formatDate(new Date() , 'yyyy-MM-dd', 'en-CA');
  startDate: string = formatDate(new Date().setDate(new Date().getDate() - 30) , 'yyyy-MM-dd', 'en-CA');
  pageSize = 9;
  currentPage = new BehaviorSubject(1);
  totalPages = new BehaviorSubject(1);
  constructor(private discountService: DiscountService) { }

  ngOnInit(): void {
  }
  getPage = (currentPage: number): void => {
    this.discountService.getPageDiscounts(currentPage - 1, this.pageSize).subscribe(data => {
      this.discounts = data.content;
      this.totalPages.next( data === [] ? 1 : data.totalPages);
    });
  }
  getData(): void{
    this.getPage(1);
  }
  edit(index: number): void{
    this.discount = this.discounts[index];
    this.viewDiscounts = false;
    this.newDiscount = false;
  }
  showNewDiscount(): void{
    this.viewDiscounts = false;
    this.newDiscount = true;
    this.usedCode = false;
    this.discount = {
      id: 0,
      type: 'FLAT',
      code: '',
      value: NaN,
      startDate: '',
      endDate: ''
    };
  }
  delete(index: number): void{
    this.discount = this.discounts[index];
    this.showDeleteModal = true;
  }
  hideModal(): void{
    this.showDeleteModal = false;
  }
  deleteDiscount(): void{
    this.discountService.deleteDiscountCode(this.discount.id).subscribe(() => {
      this.hideModal();
      this.getPage(this.currentPage.value);
    });
  }
  save(): void{
    if (this.newDiscount){
      this.discountService.createDiscountCode(this.discount).subscribe(() => {
        this.getPage(1);
        this.back();
      },
    (error) => {
        console.log(error);
        if (error.status === 406){
          this.usedCode = true;
        }
      });
    }else{
      this.discountService.updateDiscountCode(this.discount).subscribe(() => {
        this.getPage(this.currentPage.value);
        this.back();
      });
    }
  }
  back(): void{
    this.viewDiscounts = true;
  }
}
