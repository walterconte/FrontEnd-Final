import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/component/product/product.service';
import { VendaService } from 'src/app/component/venda/venda.service';
import { Venda } from 'src/app/component/venda/venda-read/venda.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  qtdProdutos: number = 0;
  qtdVendas: number = 0;
  qtdPendentes: number = 0;

  constructor(
    private productService: ProductService,
    private vendaService: VendaService
  ) {}

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.qtdProdutos = products.length;
    });

    this.vendaService.read().subscribe(vendas => {
      this.qtdVendas = vendas.filter(v => v.vndConcluida).length;
    });
    
    this.vendaService.read().subscribe(vendas => {
      this.qtdVendas = vendas.length;
      this.qtdPendentes = vendas.filter(v => !v.vndConcluida).length;
    });
  }
}
