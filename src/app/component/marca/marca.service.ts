import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Marca } from './marca-read/marca.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
baseUrl = "http://localhost:8080/marcas";
  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }


  showMessage(msg: string): void{
    this.snackBar.open(msg, 'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

   create(marcas: Marca): Observable<Marca>{
      return this.http.post<Marca>(this.baseUrl, marcas)
    }
  
    read(): Observable<Marca[]>{
      return this.http.get<Marca[]>(this.baseUrl)
    }
  
    readById(marId: string): Observable<Marca>{
      const url = `${this.baseUrl}/${marId}`
      return this.http.get<Marca>(url)
    }
  
    update(marca: Marca): Observable<Marca>{
      const url = `${this.baseUrl}/${marca.marId}`
      return this.http.put<Marca>(url,marca)
    }
  
  
    delete(marId: number): Observable<Marca>{
      const url = `${this.baseUrl}/${marId}`
      return this.http.delete<Marca>(url)
    }
    

}