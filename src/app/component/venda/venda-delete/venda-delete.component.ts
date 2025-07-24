import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VendaService } from '../venda.service';
import { Venda } from '../venda-read/venda.model';

@Component({
  selector: 'app-venda-delete',
  templateUrl: './venda-delete.component.html',
  styleUrls: ['./venda-delete.component.css']
})
export class VendaDeleteComponent implements OnInit {
  venda!: Venda;

  constructor(
    private vendaService: VendaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const vndId = this.route.snapshot.paramMap.get('vndId');
    if (vndId) {
      this.vendaService.readById(vndId).subscribe((venda) => {
        this.venda = venda;
      });
    }
  }

  deleteVenda(): void {
    this.vendaService.delete(this.venda.vndId!).subscribe(() => {
      this.vendaService.showMessage('Venda excluída com sucesso!');
      this.router.navigate(['/vendas']);
    });
  }

  cancel(): void {
    this.router.navigate(['/vendas']);
  }
}
