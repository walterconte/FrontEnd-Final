import { Component } from '@angular/core';
import { PaymentMethod } from '../payment-method-read/paymentMethod.model';
import { PaymentMethodService } from '../payment-method.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-method-delete',
  templateUrl: './payment-method-delete.component.html',
  styleUrls: ['./payment-method-delete.component.css']
})
export class PaymentMethodDeleteComponent {
  paymentMethod!: PaymentMethod;

  constructor(
    private paymentMethodService: PaymentMethodService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const fpgId = this.route.snapshot.paramMap.get('fpgId');
    this.paymentMethodService.readById(fpgId!).subscribe(paymentMethod =>{
      this.paymentMethod = paymentMethod
    })
  }

  deletePaymentMethod(): void {
    this.paymentMethodService.delete(this.paymentMethod.fpgId!).subscribe(() =>{
    this.paymentMethodService.showMessage('Forma de pagamento excluido com sucesso!')  
    this.router.navigate(['/paymentMethods'])
    })
  }

  cancel(): void{
    this.router.navigate(['/paymentMethods'])
  }
}
