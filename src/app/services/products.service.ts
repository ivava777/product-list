import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  path = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.path);
  }

  get(pageNum: number, pageSize: number): Observable<Product[]> {
    const params = new HttpParams().set('_page', pageNum.toString()).set('_limit', pageSize.toString());
    return this.http.get<Product[]>(this.path, { params });
  }

  getItem(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.path}/${id}`);
  }

  add(product: Product): Observable<Product> {
    return this.http.post<Product>(this.path, product, { headers: { 'Content-Type': 'application/json' } });
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.path}/${product.id}`, product, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  delete(product: Product): Observable<Product> {
    return this.http.delete<Product>(`${this.path}/${product.id}`);
  }
}
