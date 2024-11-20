import * as Boom from '@hapi/boom'
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
  async (req: GetProductsByCategoryRequest, res: Response<Product[]>) => {
    const category = await ProductCategory.findOne({
      where: {
        name: req.params.productCategory,
      },
    })

    if (!category) {
      throw Boom.notFound(
        `Product category ${req.params.productCategory} does not exist`
      )
    }

    const products = await Product.findAll({
      include: [
        { model: ProductCategory, where: { name: req.params.productCategory } },
      ],
    })

    return res.send(products)
  }
)

export default router
