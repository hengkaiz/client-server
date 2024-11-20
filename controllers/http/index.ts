import { PRODUCTS } from './constants'
import * as Boom from '@hapi/boom'
import { Response, Router } from 'express'

import {
  DeleteProductByIdRequest,
  GetProductByIdRequest,
  GetProductsRequest,
  PatchProductByIdRequest,
  PostProductsRequest,
} from './types'
import { Product } from './types'

const router: Router = Router()

let i = 1

function getId() {
  return i++
}

router.post(
  '/http/products',
  async (req: PostProductsRequest, res: Response<Product>) => {
    const { name, price, description, currency } = req.body
    const product = {
      id: getId(),
      name,
      price,
      description,
      currency,
    }

    PRODUCTS.push(product)
    return res.send(product)
  }
)

router.get(
  '/http/products',
  async (req: GetProductsRequest, res: Response<Product[]>) => {
    res.send(PRODUCTS)
  }
)

router.get(
  '/http/products/:id',
  async (
    req: GetProductByIdRequest,
    res: Response<Product | { product: null }>
  ) => {
    const product = PRODUCTS.find(
      (product) => parseInt(req.params.id) === product.id
    )

    if (!product) {
      throw Boom.notFound('Invalid Product Id')
    }

    res.send(product ? product : { product: null })
  }
)

router.patch(
  '/http/products/:id',
  async (
    req: PatchProductByIdRequest,
    res: Response<Product | { product: null }>
  ) => {
    const product = PRODUCTS.find(
      (product) => parseInt(req.params.id) === product.id
    )

    if (!product) {
      throw Boom.notFound('Invalid Product Id')
    }

    Object.assign(product, req.body)

    return res.send(product)
  }
)

router.delete(
  '/http/products/:id',
  async (
    req: DeleteProductByIdRequest,
    res: Response<{ id: number } | { product: null }>
  ) => {
    const productIndex = PRODUCTS.findIndex(
      (product) => product.id === parseInt(req.params.id)
    )

    if (productIndex < 0) {
      throw Boom.notFound('Invalid Product Id')
    }

    PRODUCTS.splice(productIndex, 1)

    return res.send({ id: parseInt(req.params.id) })
  }
)

export default router
