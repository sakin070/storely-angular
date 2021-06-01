import { Injectable } from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const API = 'http://localhost:8080/user';
// const API = 'https://storley.herokuapp.com/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
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

  createUser(user: any): Observable<any>{
    return this.http.post(API, user, this.httpOptions);
  }

  verifyUsername(username: string): Observable<any>{
    return this.http.get(API + '/username?username=' + username, this.httpOptions);
  }
}
