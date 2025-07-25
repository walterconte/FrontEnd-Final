import { Component } from '@angular/core';

/**
 * Componente responsável pelo cabeçalho da aplicação.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  /**
   * Ação executada ao clicar no botão "!".
   */
  onAlertClick(): void {
    alert('Você clicou no botão de alerta!');
  }
}
