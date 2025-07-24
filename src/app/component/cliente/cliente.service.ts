import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from './cliente-read/cliente.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseUrl = "http://localhost:8080/clientes"; // URL base da API
  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }


    /** Exibe uma mensagem de notificação. */
    showMessage(msg: string): void {
      this.snackBar.open(msg, 'X', {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top"
      });
    }


    create(cliente: Cliente): Observable<Cliente>{
      return this.http.post<Cliente>(this.baseUrl, cliente)
    }
  
    read(): Observable<Cliente[]>{
      return this.http.get<Cliente[]>(this.baseUrl)
    }
   
    readById(cliId: string): Observable<Cliente>{
      const url = `${this.baseUrl}/${cliId}`
      return this.http.get<Cliente>(url)
    }
  
    update(cliente: Cliente): Observable<Cliente>{
      const url = `${this.baseUrl}/${cliente.cliId}`
      return this.http.put<Cliente>(url, cliente)
    }
  
  
    delete(cliId: number): Observable<Cliente>{
      const url = `${this.baseUrl}/${cliId}`
      return this.http.delete<Cliente>(url)
    }
  
  
}
