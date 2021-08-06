import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

// const AUTH_API = 'https://storley.herokuapp.com';
const AUTH_API = 'http://localhost:8080/api';
@Injectable({
  providedIn: 'root'
})
export class MakeSaleService {

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
  getStockBySKU(sku: string): Observable<any> {
    return this.http.get(AUTH_API + '/stock/sku/' + sku, this.httpOptions);
  }
  clearSaleItems(): Observable<any>{
    return this.http.delete(AUTH_API + '/sale', this.httpOptions);
  }
  createSale(sale: any): Observable<any>{
    return this.http.post(AUTH_API + '/sale', sale, this.httpOptions);
  }
  persistSale(): Observable<any>{
    return this.http.post(AUTH_API + '/sale/persist', {}, this.httpOptions);
  }
  addLoyaltyCard(cardNumber: string, saleId: number): Observable<any>{
    return this.http.patch(AUTH_API + '/sale/add-loyalty-card-byId?cardNumber=' + cardNumber + '&saleId=' + saleId, {}, this.httpOptions);
    // return this.http.patch(AUTH_API + '/sale/add-loyalty-card?cardNumber=' + cardNumber, {}, this.httpOptions);
  }
  usePoints(points: number, saleId: number): Observable<any>{
    return this.http.patch(AUTH_API + '/sale/redeem-pointsById?points=' + points + '&saleId=' + saleId, {}, this.httpOptions);
  }
  applyDiscount( discountCode: string, saleId: number): Observable<any>{
    return this.http.patch(AUTH_API + '/sale/add-discount?code=' + discountCode + '&saleId=' + saleId, {}, this.httpOptions);
  }
  getLoyaltyManager(): Observable<any>{
    return this.http.get(AUTH_API + '/loyalty-manager', this.httpOptions);
  }
  unRedeemPoints(saleId: number): Observable<any>{
    return this.http.patch(AUTH_API + '/sale/undo-redeem-pointsById?saleId=' + saleId, {}, this.httpOptions);
  }
  removeDiscount(): Observable<any>{
    return this.http.patch(AUTH_API + '/sale/remove-discount', {}, this.httpOptions);
  }
  getSaleByUserAndDate(userId: number, soldOn: string): Observable<any>{
    return this.http.get(AUTH_API + '/sale/user-and-date?postingUserId=' + userId + '&soldOn=' + soldOn ,  this.httpOptions);
  }
  printSale(saleId: number): Observable<any>{
    return this.http.get(AUTH_API + '/sale/user-and-date?saleId=' + saleId,  this.httpOptions);
  }
  addStock(stock: any, saleId: number): Observable<any>{
    if (!saleId){
      saleId = 0;
    }
    return this.http.patch(AUTH_API + '/sale/addStock?saleId=' + saleId, stock, this.httpOptions);
  }
  addStockBySKU(sku: string, saleId: number): Observable<any>{
    if (!saleId){
      saleId = 0;
    }
    return this.http.patch(AUTH_API + '/sale/addStockBySKU?sku=' + sku + '&saleId=' + saleId, {}, this.httpOptions);
  }
  removeStock(stock: any, saleId: number): Observable<any>{
    return this.http.patch(AUTH_API + '/sale/removeStock?saleId=' + saleId, stock, this.httpOptions);
  }
  persistSaleById( saleId: number, payments: any): Observable<any>{
    return this.http.post(AUTH_API + '/sale/persistSale?saleId=' + saleId, payments, this.httpOptions);
  }
  clearSaleById( saleId: number): Observable<any>{
    return this.http.delete(AUTH_API + '/sale/deleteSale?saleId=' + saleId, this.httpOptions);
  }
  getSale(saleId: number): Observable<any>{
    return this.http.get(AUTH_API + '/sale/' + saleId,  this.httpOptions);
  }
  addReturn(saleId: number, saleReturn: any): Observable<any>{
    return this.http.patch(AUTH_API + '/sale/return?saleId=' + saleId, saleReturn, this.httpOptions);
  }
}
