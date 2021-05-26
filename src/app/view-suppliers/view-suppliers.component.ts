import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SupplierService} from '../_services/supplier.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-view-suppliers',
  templateUrl: './view-suppliers.component.html',
  styleUrls: ['./view-suppliers.component.css']
})
export class ViewSuppliersComponent implements OnInit {
  suppliers: any[] = [];
  supplier = {
    name: '',
    phoneNumber: '',
    email: '',
    address: ''
  };
  supplierTable = true;
  modifySupplier = false;
  searchString = '';
  pageSize = 9;
  currentPage = new BehaviorSubject(1);
  totalPages = new BehaviorSubject(1);
  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.getPage(1);
  }
  edit(index: number): void {
    this.supplier = this.suppliers[index];
    this.supplierTable = false;
  }
  back(): void {
    this.supplierTable = true;
  }
  editSupplier(form: NgForm): void{
    this.supplierService.editSupplier(this.supplier).subscribe(
        () => {
          this.back();
          form.resetForm();
          this.getPage(1);
        },
        () => {
          this.modifySupplier = true;
        }
    );
  }
  search(): void{
    this.getPage(1);
    this.currentPage.next(1);
  }
  getPage = (currentPage: number): void => {
    if (this.searchString === ''){
      this.supplierService.getSupplierPage(currentPage - 1, this.pageSize).subscribe( data => {
        this.suppliers = data.content;
        this.totalPages.next( data === [] ? 1 : data.totalPages);
      });
    }else{
      this.supplierService.getSupplierByName(this.searchString, currentPage - 1, this.pageSize).subscribe( data => {
        this.suppliers = data.content;
        this.totalPages.next( data === [] ? 1 : data.totalPages);
      });
    }
  }
}
