import { Injectable } from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

// const API = 'http://localhost:8080/loyalty-manager';
const API = 'https://storley.herokuapp.com/loyalty-manager';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyManagerService {
  httpOptions: any ;
  constructor(private tokenStorageService: TokenStorageService, private http: HttpClient) {
    if (tokenStorageService.getToken()){
      this.httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: tokenStorageService.getToken()as string })
      };
    }
  }
  getLoyaltyManager(): Observable<any>{
    return this.http.get(API, this.httpOptions);
  }
  updateLoyaltyManager(loyaltyManager: any): Observable<any>{
    return this.http.patch(API, loyaltyManager, this.httpOptions);
  }
}
