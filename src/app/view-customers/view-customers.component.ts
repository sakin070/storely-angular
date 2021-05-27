import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../_services/customer.service';
import {LoyaltyCardService} from '../_services/loyalty-card.service';
import {NgForm} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.css']
})
export class ViewCustomersComponent implements OnInit {
  createCustomerError = false;
  customerTable = true;
  customer = {
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    loyaltyCard: {
      cardNumber: ''
    }
  };
  loyaltyCard = '';
  loyaltyCards: any[] = [];
  timer: any;
  customers: any[] = [];
  searchString = '';
  pageSize = 9;
  currentPage = new BehaviorSubject(1);
  totalPages = new BehaviorSubject(1);
  constructor(private customerService: CustomerService, private loyaltyCardService: LoyaltyCardService) { }

  ngOnInit(): void {
    this.getPage(1);
  }
  edit(index: number): void {
    this.customer = this.customers[index];
    this.customerTable = false;
  }
  back(): void {
    this.customerTable = true;
  }
  updateCustomer(form: NgForm): void{
    this.customerService.editCustomer(this.customer).subscribe(
        () => {
          this.back();
          form.resetForm();
          this.getPage(1);
        },
        () => {
          this.createCustomerError = true;
        }
    );
  }
  getLoyaltyCards(): void{
    if (this.timer){
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.loyaltyCardService.getLoyaltyCardsByCardNumber(this.loyaltyCard, 0, 20)
          .subscribe(data => {
            this.loyaltyCards = data.content;
            if (this.loyaltyCards.length === 1){
              this.customer.loyaltyCard = this.loyaltyCards[0];
            }
          });
    }, 400);
  }
  search(): void{
    this.getPage(1);
    this.currentPage.next(1);
  }
  getPage = (currentPage: number): void => {
    if (this.searchString === ''){
      this.customerService.getCustomerPage(currentPage - 1, this.pageSize).subscribe( data => {
        this.customers = data.content;
        this.totalPages.next( data === [] ? 1 : data.totalPages);
      });
    }else{
      this.customerService.getCustomerByName(this.searchString, currentPage - 1, this.pageSize).subscribe( data => {
        this.customers = data.content;
        this.totalPages.next( data === [] ? 1 : data.totalPages);
      });
    }
  }
}
