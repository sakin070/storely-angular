import { Injectable } from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const API = 'https://storley.herokuapp.com/expense';
// const API = 'http://localhost:8080/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

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
  getAllExpensesByGroup(startDate: string, endDate: string): Observable<any> {
    return this.http.get(API + '/group-total?startDate=' + startDate + '&endDate=' + endDate, this.httpOptions);
  }
}