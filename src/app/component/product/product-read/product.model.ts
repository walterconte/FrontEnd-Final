
import { Marca } from 'src/app/component/marca/marca-read/marca.model';
import { Supplier } from '../../supplier/supplier-read/supplier.model'; 

export interface Product {
  proId?: number
  proNome: string
  proPrecoCusto: number
  proPrecoVenda: number
  proQuantidade: number
  proDescricao: string
  proCodigoBarras: string
  marca?: Marca;        
  proAtivo: boolean
  proDataCadastro: Date
  proDataAtualizacao?: Date; 
 fornecedor?: Supplier
}