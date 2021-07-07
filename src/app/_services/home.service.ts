import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorageService} from './token-storage.service';

const AUTH_API = 'https://storley.herokuapp.com';
// const AUTH_API = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  httpOptions: any ;
  textHttpOptions: any;
  constructor(private tokenStorageService: TokenStorageService, private http: HttpClient) {
    if (tokenStorageService.getToken()){
      this.httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: tokenStorageService.getToken()as string })
      };
      this.textHttpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: tokenStorageService.getToken()as string }),
        responseType: 'text'
      };
    }
  }
  getMonthsProfit(): Observable<any> {
    return this.http.get(AUTH_API + '/sale/current/month/profit', this.httpOptions);
  }
  getLast7DaysOfSale(): Observable<any> {
    return this.http.get(AUTH_API + '/sale/last-seven', this.httpOptions);
  }
  getInventorySellingPrice(): Observable<any> {
    return this.http.get(AUTH_API + '/stock/inventory/selling-price', this.httpOptions);
  }
  getInventoryCostPrice(): Observable<any> {
    return this.http.get(AUTH_API + '/stock/inventory/cost-price', this.httpOptions);
  }
  getToBuyItems(): Observable<any> {
    return this.http.get(AUTH_API + '/buy-item', this.httpOptions);
  }
  clearToBuyItems(): Observable<any> {
    return this.http.delete(AUTH_API + '/buy-item', this.textHttpOptions);
  }
  deleteToBuyItem(buyItemId: number): Observable<any> {
    return this.http.delete(AUTH_API + '/buy-item/' + buyItemId, this.textHttpOptions);
  }
}
