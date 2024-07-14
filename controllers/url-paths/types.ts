import { Request } from 'express'

export interface Product {
  id: number
  name: string
  price: number
  discount?: {
    type: 'sale'
    percentage: number
  }
}

export interface GetAllProductsRequest extends Request {}

export interface GetAllProductsWithDiscountRequest extends Request {}

export interface GetProductByIdRequest extends Request {
  params: {
    id: string
  }
}
