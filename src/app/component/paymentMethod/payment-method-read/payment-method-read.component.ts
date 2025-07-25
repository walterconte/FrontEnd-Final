import { Component } from '@angular/core';
import { PaymentMethodService } from '../payment-method.service';
import { PaymentMethod } from './paymentMethod.model';

@Component({
  selector: 'app-payment-method-read',
  templateUrl: './payment-method-read.component.html',
  styleUrls: ['./payment-method-read.component.css']
})
export class PaymentMethodReadComponent {
  paymentMethods!: PaymentMethod[]; // Usando a interface PaymentMethod
  displayedColumns = ['fpgId','fpgNome', 'fpgTipo','fpgPermiteParcelamento','fpgNumMaxParcelas','fpgTaxaAdicional', 'action']; // Atualizando as colunas

  constructor(private paymentMethodService: PaymentMethodService) { }

  ngOnInit(): void {
      this.paymentMethodService.read().subscribe(paymentMethods => {
          this.paymentMethods = paymentMethods;
          console.log(paymentMethods);
      });
  }
}
