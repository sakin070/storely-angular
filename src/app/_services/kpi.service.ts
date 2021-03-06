import { Injectable } from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

// const API = 'https://storley.herokuapp.com/analytics';
const API = 'http://localhost:8080/api/analytics';

@Injectable({
  providedIn: 'root'
})
export class KpiService {

  httpOptions: any ;
  textHttpOptions: any;
  blobHttpOptions: any;
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
  getIncomeBreakdown(startDate: string, endDate: string): Observable<any> {
    return this.http.get(API + '/income-breakdown?startDate=' + startDate + '&endDate=' + endDate, this.httpOptions);
  }
  getStoreKPI(startDate: string, endDate: string): Observable<any> {
    return this.http.get(API + '/store?startDate=' + startDate + '&endDate=' + endDate, this.httpOptions);
  }
  getPageCategoryKPI(pageNumber: number, pageSize: number, startDate: string, endDate: string): Observable<any> {
    return this.http.get(API + '/categories?pageNumber=' + pageNumber + '&pageSize=' + pageSize +
      '&startDate=' + startDate + '&endDate=' + endDate, this.httpOptions);
  }
  getPageProductKPI(pageNumber: number, pageSize: number, startDate: string, endDate: string): Observable<any> {
    return this.http.get(API + '/products?pageNumber=' + pageNumber + '&pageSize=' + pageSize +
      '&startDate=' + startDate + '&endDate=' + endDate, this.httpOptions);
  }
  downloadBalanceSheet(startDate: string, endDate: string): Observable<any>{
    return this.http.get(API + '/download/balanceSheet?startDate=' + startDate + '&endDate=' + endDate, this.blobHttpOptions);
  }
}
