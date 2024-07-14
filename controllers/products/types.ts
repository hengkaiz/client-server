import { Request } from 'express'

import { IUserRequest } from 'controllers/users/types'

import { ProductCreationAttributes } from 'models/product'

enum CurrencyCode {
  USD = 'USD',
  GBP = 'GBP',
  EUR = 'EUR',
}

export interface Product {
  id?: number
  name: string
  price: number
  description: string
  currency: CurrencyCode
}

export interface RequestWithUser extends Request {
  user?: IUserRequest
}

// Modify the type here
export interface PostProductsRequest extends RequestWithUser {
  body: {}
}

export interface GetProductsRequest extends RequestWithUser {}

// Modify the type here
export interface GetProductByIdRequest extends RequestWithUser {
  params: {}
}

// Modify the type here
export interface PatchProductByIdRequest extends RequestWithUser {
  params: {}
  body: {}
}

// Modify the type here
export interface DeleteProductByIdRequest extends RequestWithUser {
  params: {}
}
