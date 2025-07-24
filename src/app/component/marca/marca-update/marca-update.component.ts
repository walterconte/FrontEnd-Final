import { Component } from '@angular/core';
import { Marca } from '../marca-read/marca.model';
import { MarcaService } from '../marca.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-marca-update',
  templateUrl: './marca-update.component.html',
  styleUrls: ['./marca-update.component.css']
})
export class MarcaUpdateComponent {
  marca!: Marca;

  constructor(private marcaService: MarcaService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.marcaService.readById(id!).subscribe((marca: Marca) =>{
      this.marca = marca
    })
  }

  updateMarca(): void {
    // Verificação: nenhum campo pode estar vazio ou com valores inválidos
    if (
      !this.marca.marNome.trim() ||
      (this.marca.marAtivo !== true && this.marca.marAtivo !== false) // validação para booleano marAtivo
    ) {
      this.marcaService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
      return;
    }
    
    this.marca.marDataAtualizado = new Date();

    this.marcaService.update(this.marca).subscribe(() => {
      this.marcaService.showMessage('Marca atualizado com sucesso!');
      this.router.navigate(['/marcas']);
    });
  }
  cancel(): void {
    this.router.navigate(['/marcas']);
  }



apenasLetras(event: KeyboardEvent): void {
  const charCode = event.key;
  const regex = /^[A-Za-zÀ-ÿ\s]*$/;

  if (!regex.test(charCode)) {
    event.preventDefault();
  }
}

bloquearPaste(event: ClipboardEvent): void {
  const texto = event.clipboardData?.getData('text') || '';
  const regex = /^[A-Za-zÀ-ÿ\s]*$/;
  if (!regex.test(texto)) {
    event.preventDefault();
  }
}
}