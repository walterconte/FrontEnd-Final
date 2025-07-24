import { Component } from '@angular/core';
import { Marca } from '../marca-read/marca.model';
import { MarcaService } from '../marca.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-marca-delete',
  templateUrl: './marca-delete.component.html',
  styleUrls: ['./marca-delete.component.css']
})
export class MarcaDeleteComponent {
  marca!: Marca;

  constructor(
    private marcaService: MarcaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const marId = this.route.snapshot.paramMap.get('marId');
    this.marcaService.readById(marId!).subscribe(marca =>{
      this.marca = marca
    })
  }

  deleteMarca(): void {
    this.marcaService.delete(this.marca.marId!).subscribe(() =>{
    this.marcaService.showMessage('Marca excluido com sucesso!')  
    this.router.navigate(['/marcas'])
    })
  }

  cancel(): void{
    this.router.navigate(['/marcas'])
  }
}