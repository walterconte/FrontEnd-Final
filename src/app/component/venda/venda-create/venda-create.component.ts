import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VendaService } from '../venda.service';
import { ClienteService } from '../../cliente/cliente.service';
import { PaymentMethodService } from '../../paymentMethod/payment-method.service';

import { Venda } from '../venda-read/venda.model';
import { Cliente } from '../../cliente/cliente-read/cliente.model';
import { PaymentMethod } from '../../paymentMethod/payment-method-read/paymentMethod.model';
import { ItemVenda } from '../venda-read/itemVenda.model';
import { Product } from '../../product/product-read/product.model';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-venda-create',
  templateUrl: './venda-create.component.html',
  styleUrls: ['./venda-create.component.css']
})
export class VendaCreateComponent implements OnInit {

  venda: Venda = {
    cliente: undefined!,
    formaPagamento: undefined!,
    vndDataVenda: new Date(),
    vndTotal: 0,
    vndConcluida: false,
    vndObservacao: '',
    itens: []
  };

  clientes: Cliente[] = [];
  formasPagamento: PaymentMethod[] = [];
  produtos: Product[] = [];

  itemColumns = ['produto', 'quantidade', 'precoUnitario', 'subtotal', 'action'];

  constructor(
    private vendaService: VendaService,
    private clienteService: ClienteService,
    private paymentMethodService: PaymentMethodService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clienteService.read().subscribe(clientes => (this.clientes = clientes));
    this.paymentMethodService.read().subscribe(fpgs => (this.formasPagamento = fpgs));
    this.productService.read().subscribe(prods => (this.produtos = prods));

    this.addItem(); // inicia com um item vazio no array
  }

  addItem(): void {
    const novoItem: ItemVenda = {
      produto: undefined!,
      ivdQuantidade: 1,
      ivdPrecoUnitario: 0,
      ivdSubtotal: 0
    };
    this.venda.itens = [...this.venda.itens, novoItem]; // ← troca a referência do array
  }
  
  removeItem(index: number): void {
    this.venda.itens = this.venda.itens.filter((_, i) => i !== index); // ← troca a referência
    this.calculateTotal();
  }
  

  updateItemSubtotal(index: number): void {
    const item = this.venda.itens[index];
    if (!item) return; // <-- Adiciona esta linha de segurança

    if (item.produto) {
      item.ivdPrecoUnitario = item.produto.proPrecoVenda;
      item.ivdSubtotal = item.ivdPrecoUnitario * item.ivdQuantidade;
    } else {
      item.ivdPrecoUnitario = 0;
      item.ivdSubtotal = 0;
    }
    this.calculateTotal();
  }

  totalVenda: number = 0;

  calculateTotal(): void {
    this.totalVenda = this.venda.itens.reduce((sum, item) => sum + (item.ivdSubtotal || 0), 0);
  }

  createVenda(): void {
    // validação simples sem funcionario
    if (!this.venda.cliente || !this.venda.formaPagamento || this.venda.itens.length === 0) {
      alert('Preencha todos os campos obrigatórios e adicione pelo menos um item.');
      return;
    }

    for (const item of this.venda.itens) {
      if (!item.produto || item.ivdQuantidade <= 0) {
        alert('Itens inválidos. Verifique produtos e quantidades.');
        return;
      }
    }

    this.vendaService.create(this.venda).subscribe(() => {
      alert('Venda criada com sucesso!');
      this.router.navigate(['/vendas']);
    });
  }

  cancel(): void {
    this.router.navigate(['/vendas']);
  }
}
