import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Supplier } from './supplier-read/supplier.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {
baseUrl = "http://localhost:8080/fornecedores"
  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void{
    this.snackBar.open(msg, 'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(supplier: Supplier): Observable<Supplier>{
    return this.http.post<Supplier>(this.baseUrl, supplier)
  }

  read(): Observable<Supplier[]>{
    return this.http.get<Supplier[]>(this.baseUrl)
  }
 
  readById(forId: string): Observable<Supplier>{
    const url = `${this.baseUrl}/${forId}`
    return this.http.get<Supplier>(url)
  }

  update(supplier: Supplier): Observable<Supplier>{
    const url = `${this.baseUrl}/${supplier.forId}`
    return this.http.put<Supplier>(url, supplier)
  }

  delete(forId: number): Observable<Supplier>{
    const url = `${this.baseUrl}/${forId}`
    return this.http.delete<Supplier>(url)
  }

}
