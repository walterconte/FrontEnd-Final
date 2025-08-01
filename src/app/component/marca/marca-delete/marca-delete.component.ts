import { Component, OnInit } from '@angular/core';
import { Marca } from '../marca-read/marca.model';
import { MarcaService } from '../marca.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-marca-delete',
  templateUrl: './marca-delete.component.html',
  styleUrls: ['./marca-delete.component.css']
})
export class MarcaDeleteComponent implements OnInit {
  marca!: Marca;

  constructor(
    private marcaService: MarcaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      // Se não tiver id na rota, redireciona para a lista de marcas
      this.router.navigate(['/marcas']);
      return;
    }
    this.marcaService.readById(id).subscribe({
      next: (marca) => {
        this.marca = marca;
      },
      error: (err) => {
        // Se der erro, redireciona para lista de marcas
        console.error('Erro ao carregar marca:', err);
        this.router.navigate(['/marcas']);
      }
    });
  }

  deleteMarca(): void {
    if (!this.marca || !this.marca.marId) {
      return;
    }
    this.marcaService.delete(this.marca.marId).subscribe({
      next: () => {
        this.marcaService.showMessage('Marca excluída com sucesso!');
        this.router.navigate(['/marcas']);
      },
      error: (err) => {
        console.error('Erro ao excluir marca:', err);
        this.marcaService.showMessage('Erro ao excluir a marca.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/marcas']);
  }
}
