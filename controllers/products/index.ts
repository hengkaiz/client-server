import { JWT_SECRET_KEY } from '../users/constants'
import Boom from '@hapi/boom'
import { Response, Router } from 'express'
import jwt from 'jsonwebtoken'

import { IUserRequest, UserRole } from '../users/types'
import {
  DeleteProductByIdRequest,
  GetProductByIdRequest,
  GetProductsRequest,
  PatchProductByIdRequest,
  PostProductsRequest,
  RequestWithUser,
} from './types'

import Product from '../../models/product'

const router: Router = Router()

const authorizeJWT = (
  req: RequestWithUser,
  res: Response,
  next: () => void
) => {
  next()
}

router.post(
  '/products',
  authorizeJWT,
  // Modify the Response generic to that of the return type passed to res.send()
  async (req: PostProductsRequest, res: Response<null>) => {
    // Modify the code here
    return res.send({})
  }
)

router.get(
  '/products',
  // Modify the Response generic to that of the return type passed to res.send()
  async (req: GetProductsRequest, res: Response<null>) => {
    // Modify the code here
    return res.send({})
  }
)

router.get(
  '/products/:id',
  authorizeJWT,
  // Modify the Response generic to that of the return type passed to res.send()
  async (req: GetProductByIdRequest, res: Response<Product>) => {
    // Modify the code here
    return res.send({})
  }
)

router.patch(
  '/products/:id',
  authorizeJWT,
  // Modify the Response generic to that of the return type passed to res.send()
  async (req: PatchProductByIdRequest, res: Response<null>) => {
    // Modify the code here
    return res.send({})
  }
)

router.delete(
  '/products/:id',
  authorizeJWT,
  // Modify the Response generic to that of the return type passed to res.send()
  async (req: DeleteProductByIdRequest, res: Response<null>) => {
    // Modify the code here
    return res.send({})
  }
)

export default router
