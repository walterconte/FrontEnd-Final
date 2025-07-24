import { Component, OnInit } from '@angular/core';
import { Marca } from '../marca-read/marca.model';
import { MarcaService } from '../marca.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marca-create',
  templateUrl: './marca-create.component.html',
  styleUrls: ['./marca-create.component.css']
})
export class MarcaCreateComponent implements OnInit{
marca: Marca ={
    marNome: '',
    marDescricao: '',
    marDataCadastro: new Date(),
    marDataAtualizado: undefined,
    marAtivo: false
};

constructor(private marcaService: MarcaService,
  private router:Router){}


  ngOnInit(): void {
    
  }

createMarca(): void{
    // Verificação: nenhum campo pode estar vazio ou com valores inválidos
if(
!this.marca.marNome.trim()
){
  this.marcaService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
  return;
}
   // Se passou na validação, prossegue com o cadastro
    this.marcaService.create(this.marca).subscribe(() => {
      this.marcaService.showMessage('Marca criado!');
      this.router.navigate(['/marcas']);
});

}

cancel(): void{
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