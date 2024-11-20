import { Request, Response, Router } from 'express'

import { Product } from './types'

const router: Router = Router()

router.get('/json/products', (req: Request, res: Response<Product[]>) => {
  return res.send([
    {
      id: 1,
      name: 'Bathroom Slippers',
      price: 30,
      discount: {
        type: 'sale',
        percentage: 0.5,
      },
    },
    {
      id: 2,
      name: 'Bathroom Towel',
      price: 15,
    },
  ])
})

router.get('/json/product', (req: Request, res: Response<Product>) => {
  return res.send({
    id: 1,
    name: 'Bathroom Slippers',
    price: 30,
    discount: {
      type: 'sale',
      percentage: 0.5,
    },
  })
})

export default router
