import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Venda } from './venda-read/venda.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  baseUrl = "http://localhost:8080/vendas"; // URL base da API
  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }


    /** Exibe uma mensagem de notificação. */
    showMessage(msg: string): void {
      this.snackBar.open(msg, 'X', {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top"
      });
    }


    create(venda: Venda): Observable<Venda>{
      return this.http.post<Venda>(this.baseUrl, venda)
    }
  
    read(): Observable<Venda[]>{
      return this.http.get<Venda[]>(this.baseUrl)
    }
   
    readById(vndId: string): Observable<Venda>{
      const url = `${this.baseUrl}/${vndId}`
      return this.http.get<Venda>(url)
    }
  
    update(venda: Venda): Observable<Venda>{
      const url = `${this.baseUrl}/${venda.vndId}`
      return this.http.put<Venda>(url, venda)
    }
  
  
    delete(vndId: number): Observable<Venda>{
      const url = `${this.baseUrl}/${vndId}`
      return this.http.delete<Venda>(url)
    }
  
}
