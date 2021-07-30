import { Injectable } from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

// const API = 'http://localhost:8080/session';
const API = 'https://storley.herokuapp.com/category';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
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

  getCurrentSession(): Observable<any>{
    return this.http.get(API + '/current', this.httpOptions);
  }
  createNewSession(session: any): Observable<any>{
    return this.http.post(API, session, this.httpOptions);
  }
  getSessionDetails(): Observable<any>{
    return this.http.get(API + '/details', this.httpOptions);
  }
  closeNewSession(): Observable<any>{
    return this.http.patch(API + '/close', {}, this.httpOptions);
  }
  addCash(amount: number): Observable<any>{
    return this.http.patch(API + '/addCash?amount=' + amount, {}, this.httpOptions);
  }
  remitCash(remittance: any): Observable<any>{
    return this.http.patch(API + '/remit', remittance, this.httpOptions);
  }
}
