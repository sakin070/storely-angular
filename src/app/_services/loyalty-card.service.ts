import { Injectable } from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

// const API = 'https://storley.herokuapp.com/loyalty-card';
const API = 'http://localhost:8080/api/loyalty-card';
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

  getLoyaltyCardsByCardNumberActivated(cardNumber: string, pageNumber: number, pageSize: number, activated: boolean): Observable<any>{
    return this.http.get(API + '/cardNumber/available?cardNumber=' + cardNumber + '&page=' + pageNumber
      + '&size=' + pageSize + '&activated=' + activated, this.httpOptions);
  }
}
