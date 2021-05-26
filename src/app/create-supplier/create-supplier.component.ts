import { Component, OnInit } from '@angular/core';
import {SupplierService} from '../_services/supplier.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.css']
})
export class CreateSupplierComponent implements OnInit {
  createSupplierError = false;
  supplier = {
    name: '',
    phoneNumber: '',
    email: '',
    address: ''
  };
  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
  }

  createSupplier(form: NgForm): void{
    this.supplierService.createSupplier(this.supplier).subscribe(
        () => {
          form.resetForm();
        },
        () => {
          this.createSupplierError = true;
        });
  }
}
