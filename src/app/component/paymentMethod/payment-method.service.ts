import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentMethod } from './payment-method-read/paymentMethod.model';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
baseUrl = "http://localhost:8080/formapagamentos";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }


  showMessage(msg: string): void{
    this.snackBar.open(msg, 'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(paymentMethods: PaymentMethod): Observable<PaymentMethod>{
    return this.http.post<PaymentMethod>(this.baseUrl, paymentMethods)
  }

  read(): Observable<PaymentMethod[]>{
    return this.http.get<PaymentMethod[]>(this.baseUrl)
  }

  readById(fpgId: string): Observable<PaymentMethod>{
    const url = `${this.baseUrl}/${fpgId}`
    return this.http.get<PaymentMethod>(url)
  }

  update(paymentMethod: PaymentMethod): Observable<PaymentMethod>{
    const url = `${this.baseUrl}/${paymentMethod.fpgId}`
    return this.http.put<PaymentMethod>(url,paymentMethod)
  }


  delete(fpgId: number): Observable<PaymentMethod>{
    const url = `${this.baseUrl}/${fpgId}`
    return this.http.delete<PaymentMethod>(url)
  }
  
}
