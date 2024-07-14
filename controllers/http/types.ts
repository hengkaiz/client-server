import { Request } from 'express'

// Do not modify this
export interface ProductCreationAttributes {
  name: string
  price: number
  description: string
  currency: string
}

// Do not modify this
export type Product = ProductCreationAttributes & {
  id: number
}

// Modify the type here
export interface PostProductsRequest extends Request {
  body: {}
}

export interface GetProductsRequest extends Request {}

// Modify the type here
export interface GetProductByIdRequest extends Request {
  params: {}
}

// Modify the type here
export interface PatchProductByIdRequest extends Request {
  params: {}
  body: {}
}

// Modify the type here
export interface DeleteProductByIdRequest extends Request {
  params: {}
}
