import { Request } from 'express'

import { IUserRequest } from 'controllers/users/types'

import { ProductCreationAttributes } from 'models/product'

enum CurrencyCode {
  USD = 'USD',
  GBP = 'GBP',
  EUR = 'EUR',
}

/** General Product Interface(s) */
export interface Product {
  id?: number
  name: string
  price: number
  description: string
  currency: CurrencyCode
}

/** Create Product Request Interface(s) */
export interface RequestWithUser extends Request {
  user?: IUserRequest
}

export interface PostProductsRequest extends RequestWithUser {
  body: ProductCreationAttributes
}

/** Get Product Request Interface(s) */
export interface GetProductsRequest extends RequestWithUser {
  query: {
    page: string
    size: string
  }
}

/** Get Product By Id Request Interface(s) */
export interface GetProductByIdRequest extends RequestWithUser {
  params: {
    id: string
  }
}

/** Update Product By Id Request Interface(s) */
export interface PatchProductByIdRequest extends RequestWithUser {
  params: {
    id: string
  }
  body: Partial<Product>
}

/** Delete Product By Id Request Interface(s) */
export interface DeleteProductByIdRequest extends RequestWithUser {
  params: {
    id: string
  }
}
