import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../_services/customer.service';
import {NgForm} from '@angular/forms';
import {LoyaltyCardService} from '../_services/loyalty-card.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  createCustomerError = false;
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

  constructor(private customerService: CustomerService, private loyaltyCardService: LoyaltyCardService) { }

  ngOnInit(): void {
  }
  createCustomer(form: NgForm): void{
    if (!form.valid){
      return;
    }
    this.customerService.createCustomer(this.customer).subscribe(
        () => {
          form.resetForm();
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
      this.loyaltyCardService.getLoyaltyCardsByCardNumberActivated(this.loyaltyCard, 0, 20, false)
          .subscribe(data => {
            this.loyaltyCards = data.content;
            if (this.loyaltyCards.length === 1){
              this.customer.loyaltyCard = this.loyaltyCards[0];
            }
          });
    }, 400);
  }
}
