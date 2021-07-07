import { Injectable } from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

// const API = 'http://localhost:8080/stock-purchase';
const API = 'https://storley.herokuapp.com/stock-purchase';

@Injectable({
  providedIn: 'root'
})
export class StockPurchaseService {
  httpOptions: any ;
  blobHttpOptions: any;
  textHttpOptions: any;

  constructor(private tokenStorageService: TokenStorageService, private http: HttpClient) {
    if (tokenStorageService.getToken()){
      this.httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: tokenStorageService.getToken()as string })
      };
      this.blobHttpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: tokenStorageService.getToken()as string }),
        responseType: 'blob'
      };
      this.textHttpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: tokenStorageService.getToken()as string }),
        responseType: 'text'
      };
    }
  }
  createStockPurchase(stockPurchase: any): Observable<any>{
    return this.http.post(API, stockPurchase, this.httpOptions);
  }
  getPurchases(pageNumber: number, pageSize: number, startDate: string, endDate: string): Observable<any>{
    return this.http.get(API + '/page?page=' + pageNumber + '&size='
        + pageSize + '&startDate=' + startDate + '&endDate=' + endDate, this.httpOptions);
  }

  getPurchasesBySupplierId(pageNumber: number, pageSize: number, startDate: string, endDate: string, supplierId: number): Observable<any>{
    return this.http.get(API + '/supplier/page?page=' + pageNumber + '&size='
        + pageSize + '&startDate=' + startDate + '&endDate=' + endDate + '&supplierId=' + supplierId, this.httpOptions);
  }
}
