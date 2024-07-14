import { Request, Response, Router } from 'express'

import { Product } from './types'

const router: Router = Router()

router.get('/json/products', (req: Request, res: Response<Product[]>) => {
  // modify the response to return an array of products
  return res.send([])
})

router.get('/json/product', (req: Request, res: Response<Product>) => {
  // modify the response to return a product
  return res.send({})
})

export default router
