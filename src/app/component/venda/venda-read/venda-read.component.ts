import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';

import { VendaService } from '../venda.service';
import { Venda } from './venda.model';

@Component({
  selector: 'app-venda-read',
  templateUrl: './venda-read.component.html',
  styleUrls: ['./venda-read.component.css']
})
export class VendaReadComponent implements OnInit {
  vendas = new MatTableDataSource<Venda>();
  totalVendas: number = 0;

  displayedColumns: string[] = [
    'vndId',
    'cliente',
    'formaPagamento',
    'vndDataVenda',
    'vndTotal',
    'vndConcluida',
    'action'
  ];

  // Filtros para cliente, formaPagamento, data e concluída
  filters = {
    cliente: '',
    formaPagamento: '',
    vndDataVenda: '',
    vndConcluida: ''  // pode ser 'true', 'false' ou ''
  };

  constructor(private vendaService: VendaService) {}

  ngOnInit(): void {
    this.loadVendas();
  }

  loadVendas(): void {
    this.vendaService.read().subscribe(vendas => {
      this.vendas.data = vendas;
      this.totalVendas = vendas.length;

      this.vendas.filterPredicate = (data: Venda, filter: string) => {
        // filtro cliente
        const clienteMatch = (data.cliente?.cliNome || '')
          .toLowerCase()
          .includes(this.filters.cliente.toLowerCase());

        // filtro formaPagamento
        const formaPgtoMatch = (data.formaPagamento?.fpgNome || '')
          .toLowerCase()
          .includes(this.filters.formaPagamento.toLowerCase());

        // filtro concluída (boolean)
        let concluidaMatch = true;
        if (this.filters.vndConcluida === 'true') {
          concluidaMatch = data.vndConcluida === true;
        } else if (this.filters.vndConcluida === 'false') {
          concluidaMatch = data.vndConcluida === false;
        }

        // filtro data
        // Como vndDataVenda é um Date ou string ISO, vamos formatar para dd/MM/yyyy e comparar com o filtro
        let dataVendaStr = '';
        if (data.vndDataVenda) {
          const d = new Date(data.vndDataVenda);
          const day = ('0' + d.getDate()).slice(-2);
          const month = ('0' + (d.getMonth() + 1)).slice(-2);
          const year = d.getFullYear();
          dataVendaStr = `${day}/${month}/${year}`;
        }

        const dataVendaMatch = dataVendaStr.includes(this.filters.vndDataVenda);

        // retorna true se todos os filtros baterem
        return clienteMatch && formaPgtoMatch && dataVendaMatch && concluidaMatch;
      };
    });
  }

  onFilterChange(field: 'cliente' | 'formaPagamento' | 'vndDataVenda' | 'vndConcluida', event: Event | MatSelectChange): void {
    const value = event instanceof MatSelectChange
      ? event.value || ''
      : (event.target as HTMLInputElement).value;

    this.filters[field] = value;

    // Força o MatTableDataSource a reaplicar os filtros
    this.vendas.filter = Math.random().toString();
    this.totalVendas = this.vendas.filteredData.length;
  }
}
