  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { Product } from '../models/product';

  @Injectable({
    providedIn: 'root',
  })
  export class ProductService {
    private urlBase = 'http://localhost:8080/api/v1/inventory';

    constructor(private clientHttp: HttpClient) {}

    getProductList(): Observable<Product[]> {
      return this.clientHttp.get<Product[]>(`${this.urlBase}/allProducts`);
    }

    addProduct(product: Product): Observable<Object> {
      return this.clientHttp.post(`${this.urlBase}/saveProduct`, product);
    }

    getProductById(id: number): Observable<Product> {
      return this.clientHttp.get<Product>(`${this.urlBase}/selectProductById/${id}`);
    }

    updateProduct(id: number, product: Product): Observable<Object> {
      return this.clientHttp.put(`${this.urlBase}/updateProduct/${id}`, product);
    }

    deleteProduct(id: number): Observable<Object> {
      return this.clientHttp.delete(`${this.urlBase}/deleteProduct/${id}`);
    }
  }