import { Response, Router } from 'express'

import {
  GetAllProductsRequest,
  GetAllProductsWithDiscountRequest,
  GetProductByIdRequest,
  Product,
} from './types'

const router: Router = Router()

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Bathroom Slippers',
    price: 30,
  },
  {
    id: 2,
    name: 'Bathroom Towel',
    price: 50,
    discount: {
      type: 'sale',
      percentage: 0.5,
    },
  },
  {
    id: 3,
    name: 'Soap Dispenser',
    price: 20,
  },
]

router.get(
  '/url-paths/products',
  (req: GetAllProductsRequest, res: Response<Product[]>) => {
    return res.send(PRODUCTS)
  }
)

router.get(
  '/url-paths/products/with-discount',
  (req: GetAllProductsWithDiscountRequest, res: Response<Product[]>) => {
    return res.send(PRODUCTS.filter((product) => product.discount))
  }
)

router.get(
  '/url-paths/products/:id',
  (req: GetProductByIdRequest, res: Response<Product>) => {
    const numId = parseInt(req.params.id)
    return res.send(PRODUCTS.find((product) => product.id === numId))
  }
)

export default router
