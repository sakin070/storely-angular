import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

// const AUTH_API = 'https://storley.herokuapp.com';
const AUTH_API = 'http://localhost:8080';
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
  addLoyaltyCard(cardNumber: string): Observable<any>{
    return this.http.patch(AUTH_API + '/sale/add-loyalty-card?cardNumber=' + cardNumber, {}, this.httpOptions);
  }
  usePoints(points: number): Observable<any>{
    return this.http.patch(AUTH_API + '/sale/redeem-points?points=' + points, {}, this.httpOptions);
  }
  applyDiscount( discountCode: string): Observable<any>{
    return this.http.patch(AUTH_API + '/sale/add-discount?code=' + discountCode, {}, this.httpOptions);
  }
  getLoyaltyManager(): Observable<any>{
    return this.http.get(AUTH_API + '/loyalty-manager', this.httpOptions);
  }
  unRedeemPoints(): Observable<any>{
    return this.http.patch(AUTH_API + '/sale/undo-redeem-points', {}, this.httpOptions);
  }
  removeDiscount(): Observable<any>{
    return this.http.patch(AUTH_API + '/sale/remove-discount', {}, this.httpOptions);
  }
}
