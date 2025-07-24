import { Component, OnInit } from '@angular/core';
import { Supplier } from '../supplier-read/supplier.model';
import { SupplierService } from '../supplier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent implements OnInit{
   supplier: Supplier = {
    forRazaoSocial:'',
    forNomeFantasia:'',
    forCnpj: '',
     forAtivo: false,

    conCelular: '',
    conTelefoneComercial: '',
    conEmail: '',

    endRua: '',
    endNumero: '',
    endCidade: '',
    endCep: '',
    endEstado: ''

   }

   constructor(private supplierService: SupplierService, private router:Router) { }

    ngOnInit(): void {
        
    }
createSupplier(): void {
    console.log('DEBUG => Dados do formulário:');
  console.log(this.supplier);
    const s = this.supplier;
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  if (
    !this.supplier.forRazaoSocial.trim() ||
    !this.supplier.forNomeFantasia.trim() ||
    !s.forCnpj?.trim() ||
    !this.isCnpjValid(s.forCnpj) ||
  !cnpjRegex.test(s.forCnpj) || 
    !s.conCelular.trim() ||
     !s.conEmail.trim() ||
        !s.endRua.trim() ||
         !s.endNumero.trim() ||
          !s.endCidade.trim() ||
           !s.endCep.trim() || 
           !s.endEstado.trim()) {
    this.supplierService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
    return;
  }

  this.supplierService.create(this.supplier).subscribe(() => {
    this.supplierService.showMessage('Fornecedor criado!');
    this.router.navigate(['/suppliers']);
  });
}

    cancel(): void {
      this.router.navigate(['/suppliers'])
    }


    private isCnpjValid(cnpj: string): boolean {
      cnpj = cnpj.replace(/[^\d]+/g, ''); // remove tudo que não for número
    
      if (cnpj.length !== 14) return false;
    
      // Elimina CNPJs com todos os dígitos iguais
      if (/^(\d)\1+$/.test(cnpj)) return false;
    
      let tamanho = cnpj.length - 2;
      let numeros = cnpj.substring(0, tamanho);
      let digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
    
      for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
      }
    
      let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado !== parseInt(digitos.charAt(0))) return false;
    
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
    
      for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
      }
    
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado !== parseInt(digitos.charAt(1))) return false;
    
      return true;
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

}
