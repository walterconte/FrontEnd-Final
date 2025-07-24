import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-crud', // Seletor do componente
  templateUrl: './product-crud.component.html', // Caminho para o template HTML
  styleUrls: ['./product-crud.component.css'] // Caminho para os estilos CSS
})
export class ProductCrudComponent implements OnInit {
  // Construtor para injeção de dependência do Router
  constructor(private router: Router) { }

  // Método chamado ao inicializar o componente
  ngOnInit(): void {
    // Lógica de inicialização pode ser adicionada aqui
  }

  // Método para navegar para a tela de criação de produtos
  navigateToProductCreate(): void {
    this.router.navigate(['/products/create']); // Navega para a rota de criação de produtos
  } 
}