import { Injectable } from '@angular/core';
import { Product } from './product-read/product.model';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

/**
 * Serviço para gerenciar produtos via API.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = "http://localhost:8080/produtos"; // URL base da API

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  /** Exibe uma mensagem de notificação. */
  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl, product)
  }

  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl)
  }
 
  readById(proId: string): Observable<Product>{
    const url = `${this.baseUrl}/${proId}`
    return this.http.get<Product>(url)
  }

  update(product: Product): Observable<Product>{
    const url = `${this.baseUrl}/${product.proId}`
    return this.http.put<Product>(url, product)
  }

  delete(proId: number): Observable<Product>{
    const url = `${this.baseUrl}/${proId}`
    return this.http.delete<Product>(url)
  }

}