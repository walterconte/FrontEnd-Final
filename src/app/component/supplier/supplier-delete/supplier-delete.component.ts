import { Component } from '@angular/core';
import { ProductService } from '../../product/product.service';
import { Supplier } from '../supplier-read/supplier.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-supplier-delete',
  templateUrl: './supplier-delete.component.html',
  styleUrls: ['./supplier-delete.component.css']
})
export class SupplierDeleteComponent {
  supplier!: Supplier;

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const forId = this.route.snapshot.paramMap.get('forId');
    this.supplierService.readById(forId!).subscribe(supplier =>{
      this.supplier = supplier
    })
  }

  deleteSupplier(): void {
    this.supplierService.delete(this.supplier.forId!).subscribe(() =>{
    this.supplierService.showMessage('Fornecedor excluido com sucesso!')  
    this.router.navigate(['/suppliers'])
    })
  }

  cancel(): void{
    this.router.navigate(['/suppliers'])
  }
}
