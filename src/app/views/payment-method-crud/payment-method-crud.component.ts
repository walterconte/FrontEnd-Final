import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-method-crud',
  templateUrl: './payment-method-crud.component.html',
  styleUrls: ['./payment-method-crud.component.css']
})
export class PaymentMethodCrudComponent implements OnInit {

  constructor(private router: Router){}
ngOnInit(): void {
}

navigateToPaymentMethodCreate(): void{
  this.router.navigate(['/paymentMethods/create'])
}
}
