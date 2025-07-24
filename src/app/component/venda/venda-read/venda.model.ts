import { Cliente } from '../../cliente/cliente-read/cliente.model';
import { PaymentMethod } from '../../paymentMethod/payment-method-read/paymentMethod.model';
import { ItemVenda } from '../../venda/venda-read/itemVenda.model';


export interface Venda {
  vndId?: number;
  cliente: Cliente;
  formaPagamento: PaymentMethod;
  vndDataVenda?: Date;
  vndTotal?: number;
  vndConcluida: boolean;
  vndObservacao: string;
  itens: ItemVenda[];
}