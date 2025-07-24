import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cliente-read/cliente.model';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {
  cliente!: Cliente;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.clienteService.readById(id!).subscribe((cliente: Cliente) => {
      this.cliente = cliente;
    });
  }

  updateCliente(): void {
    const c = this.cliente;

    if (
      !c.cliNome.trim() ||
      !c.cliCpf?.trim() ||
      c.cliCpf.length !== 14 ||
      !this.isCpfValid(c.cliCpf) ||
      !c.conEmail.trim() ||
      !c.conTelefoneComercial.trim() ||
      !c.conCelular.trim() ||
      !c.endRua.trim() ||
      !c.endNumero.trim() ||
      !c.endCidade.trim() ||
      !c.endCep.trim() ||
      !c.endEstado.trim()
    ) {
      this.clienteService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!.');
      return;
    }

    this.clienteService.update(this.cliente).subscribe(() => {
      this.clienteService.showMessage('Cliente atualizado com sucesso!');
      this.router.navigate(['/clientes']);
    });
  }

  cancel(): void {
    this.router.navigate(['/clientes']);
  }

  private isCpfValid(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, ''); // remove pontos e traço
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
