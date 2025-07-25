import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from '../payment-method-read/paymentMethod.model';
import { PaymentMethodService } from '../payment-method.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-method-create',
  templateUrl: './payment-method-create.component.html',
  styleUrls: ['./payment-method-create.component.css']
})
export class PaymentMethodCreateComponent implements OnInit{
paymentMethod: PaymentMethod = {
  fpgNome:'',
  fpgTipo: '',
  fpgPermiteParcelamento: false,
  fpgNumMaxParcelas: null,
  fpgTaxaAdicional: 0 
}
constructor(private paymentMethodService: PaymentMethodService,
  private router:Router){}

  ngOnInit(): void {
        if (!this.paymentMethod.fpgPermiteParcelamento) {
      this.paymentMethod.fpgTaxaAdicional = 0;
      this.paymentMethod.fpgNumMaxParcelas = 1; // ou 0, conforme regra
    }
  }

  createPaymentMethod(): void {
  if (
    !this.paymentMethod.fpgNome.trim() ||
    !this.paymentMethod.fpgTipo.trim() ||
    this.paymentMethod.fpgTaxaAdicional == null || isNaN(this.paymentMethod.fpgTaxaAdicional)
  ) {
    this.paymentMethodService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
    return;
  }

  // Se permitir parcelamento, o número máximo de parcelas é obrigatório e deve estar válido
  if (this.paymentMethod.fpgPermiteParcelamento) {
    if (
      this.paymentMethod.fpgNumMaxParcelas == null ||
      this.paymentMethod.fpgNumMaxParcelas < 1 ||
      this.paymentMethod.fpgNumMaxParcelas > 12
    ) {
      this.paymentMethodService.showMessage('Informe um número válido de parcelas (entre 1 e 12).');
      return;
    }
  } else {
    // Se não permitir parcelamento, seta padrão
    this.paymentMethod.fpgNumMaxParcelas = 1;
    this.paymentMethod.fpgTaxaAdicional = 0;
  }

  this.paymentMethodService.create(this.paymentMethod).subscribe(() => {
    this.paymentMethodService.showMessage('Forma de Pagamento criada!');
    this.router.navigate(['/paymentMethods']);
  });
}


  cancel(): void {
    this.router.navigate(['/paymentMethods']);
  }

  apenasLetras(event: KeyboardEvent): void {
  const charCode = event.key;
  const regex = /^[A-Za-zÀ-ÿ\s]*$/;

  if (!regex.test(charCode)) {
    event.preventDefault();
  }
}

bloquearPaste(event: ClipboardEvent): void {
  const texto = event.clipboardData?.getData('text') || '';
  const regex = /^[A-Za-zÀ-ÿ\s]*$/;
  if (!regex.test(texto)) {
    event.preventDefault();
  }
}


apenasNumeros(event: KeyboardEvent): void {
  const charCode = event.key;
  const regex = /^[0-9]$/;

  if (!regex.test(charCode)) {
    event.preventDefault();
  }
}

bloquearPasteNumeros(event: ClipboardEvent): void {
  const texto = event.clipboardData?.getData('text') || '';
  const regex = /^[0-9]+$/;
  if (!regex.test(texto)) {
    event.preventDefault();
  }
}
onPermiteParcelamentoChange(): void {
  if (!this.paymentMethod.fpgPermiteParcelamento) {
    this.paymentMethod.fpgNumMaxParcelas = 1;  // ou 0, dependendo da regra
    this.paymentMethod.fpgTaxaAdicional = 0; // zera juros ao desabilitar
  }
}
}