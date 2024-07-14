import { Response, Router } from 'express'

import Product from '../../models/product'
import ProductCategory from '../../models/product-category'

const router: Router = Router()

interface GetProductsByCategoryRequest {
  params: {
    productCategory: string
  }
}

router.get(
  '/product-categories/:productCategory/products',
  // Modify the Response generic to that of the return type passed to res.send()
  async (req: GetProductsByCategoryRequest, res: Response<[]>) => {
    return res.send(products)
  }
)

export default router
