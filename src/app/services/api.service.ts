import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { Product, createProductDTO } from '../models/product.model';

import { environment } from './../../environments/environment';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 private apiUrl = `${environment.API_URL}`;

  constructor(
    private http : HttpClient
    ) { }

  
  getAllProducts(limit?: number, offset?: number){
    let params = new HttpParams();
    if ( limit && offset ) {
      params = params.set( 'limit', limit);
      params = params.set( 'offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, { params })
    .pipe(
      retry(3)
    );
  }

  getProductsByPage( limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: { limit, offset}
    })
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status===HttpStatusCode.Conflict) {
          return throwError('Algo está fallando en el server');
        }
        if (error.status === HttpStatusCode.NotFound ) {
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized ) {
          return throwError('No estás permitido');
        }
        return throwError('Ups algo salió mal');
      })
    )
  }
  create( dto: createProductDTO ){
     return this.http.post<Product>(this.apiUrl, dto);
  }

    update( id: string, dto: any ) {
      return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
    }

    delete(id: string) {
      return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
    }
    
// Método para obtener productos de ofertas
getDealProducts(dealId: string, country: string, sortBy: string, page: number): Observable<any> {
  const headers = new HttpHeaders()
    .set('x-apihub-key', 'V4Jn0lbATPgNYkeXIezrWuvB3JQ9ylatsLmI-3wbHBGJznrSpB')  // Tu API Key
    .set('x-apihub-host', 'Real-Time-Amazon-Data.allthingsdev.co')
    .set('x-apihub-endpoint', '5a5718b3-fc79-4439-827b-64349eaeeb30');

  const params = new HttpParams()
    .set('deal_id', dealId)
    .set('country', country)
    .set('sort_by', sortBy)
    .set('page', page.toString());

  return this.http.get<any>(`${this.apiUrl}/deal-products`, { headers, params });
}
 

// Método para obtener productos de ofertas
getProductsByCategory(category_id: string, page: string, country: string, sort_by: string,product_condition: string, min_price: number, max_price: number, brand: string ): Observable<any> {
  const headers = new HttpHeaders()
    .set('x-apihub-key', 'V4Jn0lbATPgNYkeXIezrWuvB3JQ9ylatsLmI-3wbHBGJznrSpB')  // Tu API Key
    .set('x-apihub-host', 'Real-Time-Amazon-Data.allthingsdev.co')
    .set('x-apihub-endpoint', '5a5718b3-fc79-4439-827b-64349eaeeb30');

  const params = new HttpParams()
  .set('category_id', '2478868012')  // Mantén el category_id si es válido
  .set('country', country)
  .set('sort_by', sort_by)
  .set('product_condition', 'ALL')
  .set('min_price', '105')
  .set('max_price', '110')
  .set('page', page.toString());
  const data = this.http.get<any>(`${this.apiUrl}/products-by-category`, { headers, params });
   console.log(data)
  return data;
}
  }
