import { Injectable } from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

// const API = 'https://storley.herokuapp.com/discount';
const API = 'http://localhost:8080/api/discount';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
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
  getPageDiscounts(pageNumber: number, pageSize: number): Observable<any>{
    return this.http.get(API + '/code/page?page=' + pageNumber + '&size=' + pageSize, this.httpOptions);
  }
  deleteDiscountCode(id: number): Observable<any>{
    return this.http.delete(API + '/code/' + id, this.httpOptions);
  }
  createDiscountCode(discountCode: any): Observable<any>{
    return this.http.post(API + '/code', discountCode, this.httpOptions);
  }
  updateDiscountCode(discountCode: any): Observable<any>{
    return this.http.patch(API + '/code', discountCode, this.httpOptions);
  }
}
