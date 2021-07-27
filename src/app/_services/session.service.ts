import { Injectable } from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const API = 'http://localhost:8080/session';
// const API = 'https://storley.herokuapp.com/category';

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
}
