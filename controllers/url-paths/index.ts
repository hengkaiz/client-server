import { Response, Router } from 'express'

import {
  GetAllProductsRequest,
  GetAllProductsWithDiscountRequest,
  GetProductByIdRequest,
  Product,
} from './types'

const router: Router = Router()

// Do not modify this
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
    // modify this to return all products in the PRODUCTS array
    return res.send([])
  }
)

router.get(
  '/url-paths/products/with-discount',
  (req: GetAllProductsWithDiscountRequest, res: Response<Product[]>) => {
    // modify this to return only products with a discount in the PRODUCTS array
    return res.send([])
  }
)

router.get(
  '/url-paths/products/:id',
  (req: GetProductByIdRequest, res: Response<Product>) => {
    // modify this to return the product with the specified id
    return res.send({})
  }
)

export default router
