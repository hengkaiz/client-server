export interface Product {
  id: number;
  name: string;
  price: number;
  discount?: {
    type: 'sale';
    percentage: number;
  };
}
