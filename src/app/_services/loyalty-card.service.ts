import { Injectable } from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const API = 'https://storley.herokuapp.com/loyalty-card';
@Injectable({
  providedIn: 'root'
})
export class LoyaltyCardService {
  httpOptions: any ;
  constructor(private tokenStorageService: TokenStorageService, private http: HttpClient) {
    if (tokenStorageService.getToken()){
      this.httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: tokenStorageService.getToken()as string })
      };
    }
  }

  getLoyaltyCardsByCardNumber(cardNumber: string, pageNumber: number, pageSize: number): Observable<any>{
    return this.http.get(API + '/cardNumber?cardNumber=' + cardNumber + '&page=' + pageNumber + '&size=' + pageSize, this.httpOptions);
  }
}
