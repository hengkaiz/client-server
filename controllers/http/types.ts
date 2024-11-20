import { Request } from 'express'

export interface PostProductsRequest extends Request {
  body: {
    name: string
    price: number
    description: string
    currency: string
  }
}

export interface GetProductsRequest extends Request {}

export interface GetProductByIdRequest extends Request {
  params: {
    id: string
  }
}

export interface PatchProductByIdRequest extends Request {
  params: {
    id: string
  }
  body: Partial<Product>
}

export interface DeleteProductByIdRequest extends Request {
  params: {
    id: string
  }
}

export interface ProductCreationAttributes {
  name: string
  price: number
  description: string
  currency: string
}

export type Product = ProductCreationAttributes & {
  id: number
}
