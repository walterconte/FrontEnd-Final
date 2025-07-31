import { Component } from '@angular/core';
import { Supplier } from './supplier.model';
import { SupplierService } from '../supplier.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-supplier-read',
  templateUrl: './supplier-read.component.html',
  styleUrls: ['./supplier-read.component.css']
})
export class SupplierReadComponent {
  suppliers!: MatTableDataSource<Supplier>;
   displayedColumns = ['forId', 'forRazaoSocial', 'forNomeFantasia', 'forCnpj','conEmail','conCelular','conTelefoneComercial','enderecoCompleto','forAtivo', 'action'];

  // armazenar os filtros de cada campo
  filters = {
    nomeFantasia: '',
    cnpj: '',
    email: '',
    ativo: ''
  };

  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.supplierService.read().subscribe(suppliers => {
      this.suppliers = new MatTableDataSource(suppliers);

      this.suppliers.filterPredicate = (data: Supplier, filter: string) => {
        // filter é ignorado, pois vamos usar os filtros da variável filters

        // verifica se cada filtro está contido no respectivo campo (tudo em lowercase para evitar case sensitive)
        const nomeMatch = data.forNomeFantasia.toLowerCase().includes(this.filters.nomeFantasia.toLowerCase());
            const cnpjMatch = data.forCnpj.toLowerCase().includes(this.filters.cnpj.toLowerCase());
                const emailMatch = data.conEmail.toLowerCase().includes(this.filters.email.toLowerCase());
                 const ativoStr = data.forAtivo ? 'sim' : 'não';
        const ativoMatch = ativoStr.includes(this.filters.ativo.toLowerCase());


        // retornar true só se todos os filtros baterem
        return nomeMatch && cnpjMatch && emailMatch && ativoMatch;
      };
    });
  }
  onFilterChange(field: 'nomeFantasia' | 'cnpj', event: Event | MatSelectChange) {
    let value: string;
  
    if (event instanceof MatSelectChange) {
      value = event.value;
    } else {
      value = (event.target as HTMLInputElement).value;
    }
  
    this.filters[field] = value;
    this.suppliers.filter = '' + Math.random(); // força atualização do filtro
  }
}
