import { Injectable } from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const API = 'https://storley.herokuapp.com/supplier';
@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  httpOptions: any ;
  blobHttpOptions: any;
  textHttpOptions: any;
  constructor(private tokenStorageService: TokenStorageService, private http: HttpClient) {
    if (tokenStorageService.getToken()){
      this.httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: tokenStorageService.getToken()as string })
      };
      this.blobHttpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: tokenStorageService.getToken()as string }),
        responseType: 'blob'
      };
      this.textHttpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: tokenStorageService.getToken()as string }),
        responseType: 'text'
      };
    }
  }
  getSupplier(): Observable<any>{ // TODO: remove this from application
    return this.http.get(API, this.httpOptions);
  }
  createSupplier(supplier: any): Observable<any>{
    return this.http.post(API, supplier, this.httpOptions);
  }
  editSupplier(supplier: any): Observable<any>{
    return this.http.put(API, supplier, this.httpOptions);
  }
  getSupplierPage(pageNumber: number, pageSize: number): Observable<any>{
    return this.http.get(API + '/page?page=' + pageNumber + '&size=' + pageSize, this.httpOptions);
  }
  getSupplierByName(name: string, pageNumber: number, pageSize: number): Observable<any>{
    return this.http.get(API + '/name?name=' + name + '&page=' + pageNumber + '&size=' + pageSize, this.httpOptions);
  }
}
