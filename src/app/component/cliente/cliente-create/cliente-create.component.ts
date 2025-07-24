import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente-read/cliente.model';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    cliNome: '',
    cliCpf: '',

    conCelular: '',
    conTelefoneComercial: '',
    conEmail: '',

    endRua: '',
    endNumero: '',
    endCidade: '',
    endCep: '',
    endEstado: ''
  }

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createCliente(): void {
    const c = this.cliente;

    // Validação geral + CPF real
    if (
      !c.cliNome.trim() ||
      !c.cliCpf?.trim() ||
      c.cliCpf.length !== 14 ||
      !this.isCpfValid(c.cliCpf) ||
      !c.conCelular.trim() ||
      !c.conEmail.trim() ||
      !c.endRua.trim() ||
      !c.endNumero.trim() ||
      !c.endCidade.trim() ||
      !c.endCep.trim() ||
      !c.endEstado.trim()
    ) {
      this.clienteService.showMessage('Por favor, preencha todos os campos corretamente!.');
      return;
    }

    this.clienteService.create(this.cliente).subscribe(() => {
      this.clienteService.showMessage('Cliente criado com sucesso!');
      this.router.navigate(['/clientes']);
    });
  }

  cancel(): void {
    this.router.navigate(['/clientes']);
  }

  private isCpfValid(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, ''); // remove pontuação
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
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
