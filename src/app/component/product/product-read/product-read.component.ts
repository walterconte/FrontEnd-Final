import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from './product.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {
  products!: MatTableDataSource<Product>;
  totalProdutosEstoque: number = 0;

  displayedColumns = [
    'proId',
    'proNome',
    'proPrecoVenda',
    'proQuantidade',
    'marca',
    'proAtivo',
    'fornecedor',
    'status',
    'action'
  ];

  // Filtros aplicáveis
  filters = {
    nome: '',
    marca: '',
    ativo: ''
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = new MatTableDataSource(products);
      this.totalProdutosEstoque = products.length;

      // Define o comportamento do filtro personalizado
      this.products.filterPredicate = (data: Product, filter: string) => {
        const nomeMatch = data.proNome.toLowerCase().includes(this.filters.nome.toLowerCase());

        const marcaNome = data.marca?.marNome || '';
        const marcaMatch = marcaNome.toLowerCase().includes(this.filters.marca.toLowerCase());

        const ativoStr = data.proAtivo ? 'sim' : 'não';
        const ativoMatch = ativoStr.includes(this.filters.ativo.toLowerCase());

        return nomeMatch && marcaMatch && ativoMatch;
      };
    });
  }

  // Atualiza os filtros quando o usuário digita ou seleciona valores
  onFilterChange(field: 'nome' | 'marca' | 'ativo', event: Event | MatSelectChange) {
    const value =
      event instanceof MatSelectChange
        ? event.value
        : (event.target as HTMLInputElement).value;

    this.filters[field] = value;

    // Força atualização da tabela (necessário pois MatTableDataSource usa cache)
    this.products.filter = '' + Math.random();

    // Atualiza a contagem com base nos dados filtrados
    this.totalProdutosEstoque = this.products.filteredData.length;
  }
}
