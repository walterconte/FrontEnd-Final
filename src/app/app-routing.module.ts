import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { ProductCreateComponent } from './component/product/product-create/product-create.component';
import { SupplierCreateComponent } from './component/supplier/supplier-create/supplier-create.component';
import { SupplierCrudComponent } from './views/supplier-crud/supplier-crud.component';
import { PaymentMethodCreateComponent } from './component/paymentMethod/payment-method-create/payment-method-create.component';
import { PaymentMethodCrudComponent } from './views/payment-method-crud/payment-method-crud.component';
import { ProductUpdateComponent } from './component/product/product-update/product-update.component';
import { SupplierUpdateComponent } from './component/supplier/supplier-update/supplier-update.component';
import { PaymentMethodUpdateComponent } from './component/paymentMethod/payment-method-update/payment-method-update.component';
import { ProductDeleteComponent } from './component/product/product-delete/product-delete.component';
import { SupplierDeleteComponent } from './component/supplier/supplier-delete/supplier-delete.component';
import { PaymentMethodDeleteComponent } from './component/paymentMethod/payment-method-delete/payment-method-delete.component';
import { ClienteCrudComponent } from './views/cliente-crud/cliente-crud.component';
import { ClienteCreateComponent } from './component/cliente/cliente-create/cliente-create.component';
import { ClienteUpdateComponent } from './component/cliente/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './component/cliente/cliente-delete/cliente-delete.component';

import { VendaCrudComponent } from './views/venda-crud/venda-crud.component';
import { VendaCreateComponent } from './component/venda/venda-create/venda-create.component';

import { VendaUpdateComponent } from './component/venda/venda-update/venda-update.component';
import { VendaDeleteComponent } from './component/venda/venda-delete/venda-delete.component';
import { MarcaCreateComponent } from './component/marca/marca-create/marca-create.component';
import { MarcaCrudComponent } from './views/marca-crud/marca-crud.component';

// Definição das rotas da aplicação
const routes: Routes = [
  {
    path: "", // Rota padrão
    component: HomeComponent // Componente exibido na rota padrão
  },
  {
    path: "products", // Rota para gerenciamento de produtos
    component: ProductCrudComponent // Componente para CRUD de produtos
  },
  {
    path: "products/create", // Rota para criação de um novo produto
    component: ProductCreateComponent // Componente para criar um produto
  },
  {
    path: "suppliers", // Rota para gerenciamento de fornecedores
    component: SupplierCrudComponent // Componente para CRUD de fornecedores
  },
  {
    path: "suppliers/create", // Rota para criação de um novo fornecedor
    component: SupplierCreateComponent // Componente para criar um fornecedor
  },
  {
    path: "paymentMethods", // Rota para gerenciamento de métodos de pagamento
    component: PaymentMethodCrudComponent // Componente para CRUD de métodos de pagamento
  },
  {
    path: "paymentMethods/create", // Rota para criação de um novo método de pagamento
    component: PaymentMethodCreateComponent // Componente para criar um método de pagamento
  },
  {
    path:"products/update/:id",
    component: ProductUpdateComponent
  },
  {
    path:"suppliers/update/:id",
    component:SupplierUpdateComponent
  },
  {
    path:"payment-methods/update/:id",
    component:PaymentMethodUpdateComponent
  },
  {
    path:"products/delete/:proId",
    component: ProductDeleteComponent
  },
  {
    path:"suppliers/delete/:forId",
    component: SupplierDeleteComponent
  },
  {
    path:"payment-methods/delete/:fpgId",
    component: PaymentMethodDeleteComponent
  },
  
  {
    path: "clientes", // Rota para gerenciamento de clientes
    component: ClienteCrudComponent // Componente para CRUD de clientes
  },
  {
    path: "clientes/create", // Rota para criação de um novo cliente
    component: ClienteCreateComponent // Componente para criar um cliente
  },
  {
path: "clientes/update/:id",
component:ClienteUpdateComponent
  },
  {
    path: "clientes/delete/:cliId",
component:ClienteDeleteComponent
  },
   
  {
        path:"vendas",
    component: VendaCrudComponent
    },

    {
    path: "vendas/create", // Rota para criação de um nova Venda
    component: VendaCreateComponent // Componente para criar um Venda
  },
  
  {
    path:"vendas/update/:id",
    component: VendaUpdateComponent
  },
   {
    path:"vendas/delete/:vndId",
    component: VendaDeleteComponent
  },
  { path: "marca/create", 
    component: MarcaCreateComponent 
  },
  {
  path: 'marcas',
  component: MarcaCrudComponent
},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Importa as rotas definidas
  exports: [RouterModule] // Exporta o RouterModule para uso em outros módulos
})
export class AppRoutingModule { }