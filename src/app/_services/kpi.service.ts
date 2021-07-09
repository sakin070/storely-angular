import { Injectable } from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const API = 'https://storley.herokuapp.com/analytics';
// const API = 'http://localhost:8080/analytics';

@Injectable({
  providedIn: 'root'
})
export class KpiService {

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
  getIncomeBreakdown(startDate: string, endDate: string): Observable<any> {
    return this.http.get(API + '/income-breakdown?startDate=' + startDate + '&endDate=' + endDate, this.httpOptions);
  }
}
