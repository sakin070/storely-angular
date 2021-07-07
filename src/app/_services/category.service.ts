import { Injectable } from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const API = 'http://localhost:8080/category';
// const API = 'https://storley.herokuapp.com/category';

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
    return this.http.get(API, this.httpOptions);
  }
  getCategoryStockCount(categoryId: number): Observable<any>{
    return this.http.get(API + '/stock/count/' + categoryId, this.httpOptions);
  }
  deleteCategory(categoryId: number): Observable<any>{
    return this.http.delete(API + '/' + categoryId, this.textHttpOptions);
  }
  createCategory(category: any): Observable<any>{
    return this.http.post(API, category, this.httpOptions);
  }
}
