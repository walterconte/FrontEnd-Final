import { Component } from '@angular/core';
import { Cliente } from './cliente.model';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from '../cliente.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent {
  clientes!: MatTableDataSource<Cliente>;
displayedColumns = ['cliId', 'cliNome', 'conEmail', 'cliCpf', 'conCelular','conTelefoneComercial', 'enderecoCompleto', 'action'];

 
  filters = {
    nome: '',
    email: '',
    cpf: '',
  };

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.read().subscribe(clientes => {
      this.clientes = new MatTableDataSource(clientes);

      this.clientes.filterPredicate = (data: Cliente, filter: string) => {
  

   
        const nomeMatch = data.cliNome.toLowerCase().includes(this.filters.nome.toLowerCase());
        const emailMatch = data.conEmail.toLowerCase().includes(this.filters.email.toLowerCase());
       const cpfMatch = data.cliCpf.toLowerCase().includes(this.filters.cpf.toLowerCase());

        return nomeMatch && emailMatch && cpfMatch;
      };
    });
  }
  onFilterChange(field: 'nome' | 'email' | 'cpf', event: Event | MatSelectChange) {
    let value: string;
  
    if (event instanceof MatSelectChange) {
      value = event.value;
    } else {
      value = (event.target as HTMLInputElement).value;
    }
  
    this.filters[field] = value;
    this.clientes.filter = '' + Math.random(); // força atualização do filtro
  }
}
