import { Injectable } from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

// const API = 'http://localhost:8080/stock';
const API = 'https://storley.herokuapp.com/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

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

  createStock(stock: any): Observable<any>{
    return this.http.post(API, stock, this.httpOptions);
  }
  getStock(pageNumber: number, pageSize: number): Observable<any>{
    return this.http.get(API + '/page?page=' + pageNumber + '&size=' + pageSize, this.httpOptions);
  }
  getStockByName(name: string, pageNumber: number, pageSize: number): Observable<any>{
    return this.http.get(API + '/name?name=' + name + '&page=' + pageNumber + '&size=' + pageSize, this.httpOptions);
  }
  downloadStockTable(): Observable<any>{
    return this.http.get(API + '/download/stock-table', this.blobHttpOptions);
  }
  modifyStock(stock: any): Observable<any>{
    return this.http.post(API + '/modify', stock, this.httpOptions);
  }
  deleteStock(stockId: number): Observable<any>{
    return this.http.delete(API + '/' + stockId, this.textHttpOptions);
  }
  getStockBySKU(sku: string): Observable<any> {
    return this.http.get(API + '/sku/' + sku, this.httpOptions);
  }
}
