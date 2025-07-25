import { Component } from '@angular/core';
import { PaymentMethod } from '../payment-method-read/paymentMethod.model';
import { PaymentMethodService } from '../payment-method.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-method-update',
  templateUrl: './payment-method-update.component.html',
  styleUrls: ['./payment-method-update.component.css']
})
export class PaymentMethodUpdateComponent {
  paymentMethod!: PaymentMethod;

  constructor(private paymentMethodService: PaymentMethodService,
    private router: Router,
    private route: ActivatedRoute) {}

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  this.paymentMethodService.readById(id!).subscribe((paymentMethod: PaymentMethod) => {
    this.paymentMethod = paymentMethod;

    // Se não permitir parcelamento, garante que juros começa em 0
    if (!this.paymentMethod.fpgPermiteParcelamento) {
      this.paymentMethod.fpgTaxaAdicional = 0;
      this.paymentMethod.fpgNumMaxParcelas = 1; // ou 0, conforme regra
    }
  });
}


  updatePaymentMethod(): void {
    // Valida campos obrigatórios básicos
    if (
       !this.paymentMethod.fpgNome.trim() ||
      !this.paymentMethod.fpgTipo.trim() ||
      this.paymentMethod.fpgTaxaAdicional === null ||
      this.paymentMethod.fpgTaxaAdicional === undefined
    ) {
      this.paymentMethodService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
      return;
    }
  
    // Se permitir parcelamento, valida máximo de parcelas
    if (this.paymentMethod.fpgPermiteParcelamento) {
      if (
        this.paymentMethod.fpgNumMaxParcelas === null ||
        this.paymentMethod.fpgNumMaxParcelas === undefined ||
        this.paymentMethod.fpgNumMaxParcelas < 1 ||
        this.paymentMethod.fpgNumMaxParcelas > 12
      ) {
        this.paymentMethodService.showMessage('Informe um número válido de parcelas (entre 1 e 12).');
        return;
      }
    } else {
      // Se não permitir parcelamento, limpa ou seta padrão para máximo parcelas
      this.paymentMethod.fpgNumMaxParcelas = 1; // ou 0, conforme regra do negócio
        this.paymentMethod.fpgTaxaAdicional = 0; 
    }
  
    // Prosseguir com atualização
    this.paymentMethodService.update(this.paymentMethod).subscribe(() => {
      this.paymentMethodService.showMessage('Forma de Pagamento atualizado com sucesso!');
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