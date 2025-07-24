import { Product } from '../../product/product-read/product.model';

export interface ItemVenda {
  ivdId?: number;
  produto: Product;
  ivdQuantidade: number;
  ivdPrecoUnitario?: number;
  ivdSubtotal?: number;
}