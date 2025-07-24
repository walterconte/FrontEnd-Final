import { Component } from '@angular/core';
import { Marca } from './marca.model';
import { MarcaService } from '../marca.service';

@Component({
  selector: 'app-marca-read',
  templateUrl: './marca-read.component.html',
  styleUrls: ['./marca-read.component.css']
})
export class MarcaReadComponent {
marcas!: Marca[];
displayedColumns = ['marId', 'marNome', 'marDescricao', 'marAtivo', 'action'];

constructor(private marcaService: MarcaService){}

  ngOnInit(): void {
      this.marcaService.read().subscribe(marcas => {
          this.marcas = marcas;
          console.log(marcas);
      });
  }
}