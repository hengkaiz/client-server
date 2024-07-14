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

router.get(
  '/http/products',
  // Modify the Response generic to that of the return type passed to res.send()
  async (req: GetProductsRequest, res: Response<null>) => {
    // Modify the code here
    return res.send({})
  }
)

router.get(
  '/http/products/:id',
  async (
    req: GetProductByIdRequest,
    // Modify the Response generic to that of the return type passed to res.send()
    res: Response<null>
  ) => {
    // Modify the code here
    return res.send({})
  }
)

router.post(
  '/http/products',
  // Modify the Response generic to that of the return type passed to res.send()
  async (req: PostProductsRequest, res: Response<null>) => {
    // Modify the code here
    return res.send({})
  }
)

router.patch(
  '/http/products/:id',
  async (
    req: PatchProductByIdRequest,
    // Modify the Response generic to that of the return type passed to res.send()
    res: Response<null>
  ) => {
    // Modify the code here
    return res.send({})
  }
)

router.delete(
  '/http/products/:id',
  async (
    req: DeleteProductByIdRequest,
    // Modify the Response generic to that of the return type passed to res.send()
    res: Response<null>
  ) => {
    // Modify the code here
    return res.send({})
  }
)

export default router
