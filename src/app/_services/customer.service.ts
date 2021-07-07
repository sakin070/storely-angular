import { Injectable } from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

// const API = 'https://storley.herokuapp.com/customer';
const API = 'http://localhost:8080/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  httpOptions: any ;
  constructor(private tokenStorageService: TokenStorageService, private http: HttpClient) {
    if (tokenStorageService.getToken()){
      this.httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: tokenStorageService.getToken()as string })
      };
    }
  }
  createCustomer(customer: any): Observable<any>{
    return this.http.post(API, customer, this.httpOptions);
  }
  editCustomer(customer: any): Observable<any>{
    return this.http.put(API, customer, this.httpOptions);
  }
  getCustomerPage(pageNumber: number, pageSize: number): Observable<any>{
    return this.http.get(API + '/page?page=' + pageNumber + '&size=' + pageSize, this.httpOptions);
  }
  getCustomerByName(name: string, pageNumber: number, pageSize: number): Observable<any>{
    return this.http.get(API + '/name?name=' + name + '&page=' + pageNumber + '&size=' + pageSize, this.httpOptions);
  }
}
