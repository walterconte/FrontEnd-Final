import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product-read/product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent {
  product!: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const proId = this.route.snapshot.paramMap.get('proId');
    this.productService.readById(proId!).subscribe(product =>{
      this.product = product
    })
  }

  deleteProduct(): void {
    this.productService.delete(this.product.proId!).subscribe(() =>{
    this.productService.showMessage('Produto excluido com sucesso!')  
    this.router.navigate(['/products'])
    })
  }

  cancel(): void{
    this.router.navigate(['/products'])
  }
}
