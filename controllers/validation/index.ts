import * as Boom from '@hapi/boom'
import { Request, Response, Router } from 'express'
import Joi from 'joi'

const router = Router()

interface Product {
  id: number
  name: string
  price: number
  description: string
  discount?: {
    type: 'sale'
    percentage: number
  }
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Bathroom Slippers',
    description: 'Very comfortable slippers',
    price: 30,
  },
  {
    id: 2,
    name: 'Bathroom Towel',
    description: 'Very comfortable towel',
    price: 50,
    discount: {
      type: 'sale',
      percentage: 0.5,
    },
  },
  {
    id: 3,
    name: 'Soap Dispenser',
    description: 'Automated soap dispenser',
    price: 20,
  },
]

interface CreateProductRequest extends Request {
  body: {
    name: string
    description: string
    price: number
  }
}

/*
 Modify `productSchema` such that requests with validation errors does
 not go through
*/
const productSchema = Joi.object({})

router.post(
  '/validation/products',
  (req: CreateProductRequest, res: Response<Product | null>) => {
    // Add validation check here

    const newProduct = { id: PRODUCTS.length, ...req.body }

    PRODUCTS.push(newProduct)

    return res.send(newProduct)
  }
)

export default router
