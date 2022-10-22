import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

 private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(
    private http : HttpClient
    ) { }

  
  getAllProducts(): Observable<any>{
    return this.http.get<Product[]>(this.apiUrl);
  }
  getProduct(id: string) {
    return this.http.get<Product >(`${this.apiUrl}/${id}`);

    }
  }
