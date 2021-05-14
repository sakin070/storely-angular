import { Injectable } from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = 'https://storley.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
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
  getCategories(): Observable<any>{
    return this.http.get(AUTH_API  + '/category', this.httpOptions);
  }
}
