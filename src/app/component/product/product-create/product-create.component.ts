import { Router } from "@angular/router";
import { SupplierService } from "../../supplier/supplier.service";
import { ProductService } from "../product.service";
import { Supplier } from "../../supplier/supplier-read/supplier.model";
import { Product } from "../product-read/product.model";
import { Marca } from "../../marca/marca-read/marca.model";          // import do model Marca
import { MarcaService } from "../../marca/marca.service"; // import do serviço Marca
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product: Product =
   {
    proNome: '',
    proPrecoCusto: 0,
    proPrecoVenda: 0,
    proQuantidade: 0,
    proDescricao: '',
    proCodigoBarras: '',
    proAtivo: true,
    proDataCadastro: new Date(),
    proDataAtualizacao: undefined,
    fornecedor: undefined,
    marca: undefined
  };

  fornecedores: Supplier[] = [];
  marcas: Marca[] = [];   // <-- Declaração da propriedade marcas

  constructor(
    private productService: ProductService,
    private supplierService: SupplierService,
    private marcaService: MarcaService,  // <-- Injeção do MarcaService
    private router: Router
  ) {}

  ngOnInit(): void {
    // Busca fornecedores ativos
    this.supplierService.read().subscribe(dados => {
      this.fornecedores = dados.filter(supplier => supplier.forAtivo);
    });

    // Busca marcas ativas
    this.marcaService.read().subscribe(dados => {
      this.marcas = dados.filter(marca => marca.marAtivo);
    });
  }

  createProduct(): void {
    if (
      !this.product.proNome.trim() ||
      this.product.proPrecoCusto < 0 ||
      this.product.proPrecoVenda < 0 ||
      this.product.proQuantidade < 0 ||
      !this.product.proCodigoBarras.trim() ||
      !this.product.fornecedor ||
      !this.product.marca ||
      !this.product.fornecedor.forAtivo ||  
      !this.product.marca.marAtivo 
    ) {
      this.productService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
      return;
    }

    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado!');
      this.router.navigate(['/products']);
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
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

  apenasNumeros(event: KeyboardEvent): void {
    const charCode = event.key;
    const regex = /^[0-9]$/;

    if (!regex.test(charCode)) {
      event.preventDefault();
    }
  }

  bloquearPasteNumeros(event: ClipboardEvent): void {
    const texto = event.clipboardData?.getData('text') || '';
    const regex = /^[0-9]+$/;
    if (!regex.test(texto)) {
      event.preventDefault();
    }
  }
}
