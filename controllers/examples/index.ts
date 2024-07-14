import { Request, Response, Router } from 'express'
import Boom from '@hapi/boom'

const router = Router()

interface Product {
  id: number
  name: string
  price: number
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'Bathroom Slippers', price: 50 },
  { id: 2, name: 'Bath Towel', price: 100 },
]

const PATH_PREFIX = '/example'

router.get(
  `${PATH_PREFIX}/products`,
  (req: Request, res: Response<Product[]>) => {
    return res.send(PRODUCTS)
  }
)

router.get(
  `${PATH_PREFIX}/products/:id`,
  (req: Request, res: Response<Product>) => {
    const { id } = <{ id?: string }>req.params

    if (!id) {
      return res.status(400).send()
    }

    const product = PRODUCTS.find(
      (product) => product.id === parseInt(id)
    )

    if (!product) {
      return res.status(404).send()
    }

    return res.send(product)
  }
)

router.post(
  `${PATH_PREFIX}/products/`,
  (req: Request, res: Response<Product>) => {
    const { name, price } = <{ name?: string; price?: number }>req.body

    if (!name || !price) {
      throw Boom.notFound()
    }

    return res.send()
  }
)

export default router