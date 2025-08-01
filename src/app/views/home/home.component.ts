import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/component/product/product.service';
import { ClienteService } from 'src/app/component/cliente/cliente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  qtdProdutos: number = 0;
  qtdVendas: number = 0;
  qtdClientes: number = 0;

  constructor(
    private productService: ProductService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.qtdProdutos = products.length;
    });

  this.clienteService.read().subscribe(clientes => {
  this.qtdClientes = clientes.length;
});


  }
}
