import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venda-crud',
  templateUrl: './venda-crud.component.html',
  styleUrls: ['./venda-crud.component.css']
})
export class VendaCrudComponent implements OnInit{
  // Construtor para injeção de dependência do Router
  constructor(private router: Router) { }

  // Método chamado ao inicializar o componente
  ngOnInit(): void {
    // Lógica de inicialização pode ser adicionada aqui
  }

  // Método para navegar para a tela de criação de vendas
  navigateToVendaCreate(): void {
    this.router.navigate(['/vendas/create']); // Navega para a rota de criação de vendas
  } 
}
