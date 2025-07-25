import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/template/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavComponent } from './component/template/nav/nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from './component/template/footer/footer.component';
import { HomeComponent } from './views/home/home.component';

import{MatCardModule} from '@angular/material/card';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { ProductReadComponent } from './component/product/product-read/product-read.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientModule} from '@angular/common/http';
import { SupplierReadComponent } from './component/supplier/supplier-read/supplier-read.component';
import { SupplierCrudComponent } from './views/supplier-crud/supplier-crud.component';
import { PaymentMethodReadComponent } from './component/paymentMethod/payment-method-read/payment-method-read.component';
import { PaymentMethodCrudComponent } from './views/payment-method-crud/payment-method-crud.component';
import { ProductCreateComponent } from './component/product/product-create/product-create.component';
import{MatFormFieldModule} from '@angular/material/form-field';
import{MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SupplierCreateComponent } from './component/supplier/supplier-create/supplier-create.component';
import { PaymentMethodCreateComponent } from './component/paymentMethod/payment-method-create/payment-method-create.component';
import{MatTableModule} from '@angular/material/table';
import { ProductUpdateComponent } from './component/product/product-update/product-update.component';
import { SupplierUpdateComponent } from './component/supplier/supplier-update/supplier-update.component';
import { PaymentMethodUpdateComponent } from './component/paymentMethod/payment-method-update/payment-method-update.component';
import { ProductDeleteComponent } from './component/product/product-delete/product-delete.component';
import { SupplierDeleteComponent } from './component/supplier/supplier-delete/supplier-delete.component';
import { PaymentMethodDeleteComponent } from './component/paymentMethod/payment-method-delete/payment-method-delete.component';
import { ClienteCreateComponent } from './component/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './component/cliente/cliente-delete/cliente-delete.component';
import { ClienteReadComponent } from './component/cliente/cliente-read/cliente-read.component';
import { ClienteUpdateComponent } from './component/cliente/cliente-update/cliente-update.component';
import { ClienteCrudComponent } from './views/cliente-crud/cliente-crud.component'

import { NgxMaskModule } from 'ngx-mask';

import { MatOptionModule } from '@angular/material/core'; 
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

import { MatExpansionModule } from '@angular/material/expansion';

import { VendaCreateComponent } from './component/venda/venda-create/venda-create.component';
import { VendaDeleteComponent } from './component/venda/venda-delete/venda-delete.component';
import { VendaReadComponent } from './component/venda/venda-read/venda-read.component';
import { VendaCrudComponent } from './views/venda-crud/venda-crud.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { VendaUpdateComponent } from './component/venda/venda-update/venda-update.component';
import { MarcaCreateComponent } from './component/marca/marca-create/marca-create.component';
import { MarcaReadComponent } from './component/marca/marca-read/marca-read.component';
import { MarcaUpdateComponent } from './component/marca/marca-update/marca-update.component';
import { MarcaDeleteComponent } from './component/marca/marca-delete/marca-delete.component';
import { MarcaCrudComponent } from './views/marca-crud/marca-crud.component'; 
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    ProductCrudComponent,
    ProductReadComponent,
    SupplierReadComponent,
    SupplierCrudComponent,
    PaymentMethodReadComponent,
    PaymentMethodCrudComponent,
    ProductCreateComponent,
    SupplierCreateComponent,
    PaymentMethodCreateComponent,
    ProductUpdateComponent,
    SupplierUpdateComponent,
    PaymentMethodUpdateComponent,
    ProductDeleteComponent,
    SupplierDeleteComponent,
    PaymentMethodDeleteComponent,
    ClienteReadComponent,
    ClienteCreateComponent,
    ClienteDeleteComponent,
    ClienteUpdateComponent,
    ClienteCrudComponent,
 
    VendaCreateComponent,
    VendaDeleteComponent,
    VendaReadComponent,
    VendaCrudComponent,
 
    VendaUpdateComponent,
       MarcaCreateComponent,
       MarcaReadComponent,
       MarcaUpdateComponent,
       MarcaDeleteComponent,
       MarcaCrudComponent,
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatSnackBarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
      MatOptionModule,
        CommonModule,
        MatGridListModule,
            MatExpansionModule,
                MatIconModule, 
    MatCheckboxModule,
NgxMaskModule.forRoot({
  showMaskTyped: true,
  dropSpecialCharacters: false // <-- Mantém pontos, barra e traço no model
}),

  
  ],
  
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 