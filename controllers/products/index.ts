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
  let token: string = ''

  const authorizationHeaderValue = req.header('Authorization')

  // If `Authorization` header exists, remove "Bearer " prefix to retrieve JWT token value
  if (
    authorizationHeaderValue &&
    authorizationHeaderValue.startsWith('Bearer ')
  ) {
    token = authorizationHeaderValue.replace('Bearer ', '')
  }

  if (!token) {
    throw Boom.unauthorized('No JWT Token provided')
  }

  jwt.verify(token, JWT_SECRET_KEY, (err: any, user: any) => {
    if (err) {
      throw Boom.unauthorized('JWT verification failed')
    }
    req.user = {
      username: user.username,
      role: user.role,
    } as IUserRequest

    // On success, calling next() passes control of the function execution to the next function
    next()
  })
}

router.post(
  '/products',
  authorizeJWT,
  // Modify the Response generic to that of the return type passed to res.send()
  async (req: PostProductsRequest, res: Response<Product>) => {
    // Modify the code here
    if (req.user && req.user.role !== UserRole.Seller) {
      throw Boom.forbidden(`User does not have permission`)
    }
    const { name, price, description, currency, productCategoryId } = req.body
    const attributes = {
      name,
      price,
      description,
      currency,
      productCategoryId,
    }

    const product = await Product.create(attributes)
    return res.send(product)
  }
)

router.get(
  '/products',
  authorizeJWT,
  // Modify the Response generic to that of the return type passed to res.send()
  async (req: GetProductsRequest, res: Response<Product[]>) => {
    // Modify the code here
    if (
      req.user &&
      !(req.user.role === UserRole.Seller || req.user.role === UserRole.Buyer)
    ) {
      throw Boom.forbidden(`User does not have permission`)
    }
    const { page, size } = req.query
    const pageNumber = parseInt(page)
    const sizeNumber = parseInt(size)

    const products = await Product.findAll({
      offset: (pageNumber - 1) * sizeNumber,
      limit: sizeNumber,
      order: [['id', 'asc']],
    })
    res.send(products)
  }
)

router.get(
  '/products/:id',
  authorizeJWT,
  // Modify the Response generic to that of the return type passed to res.send()
  async (req: GetProductByIdRequest, res: Response<Product>) => {
    // Modify the code here
    if (
      req.user &&
      !(req.user.role === UserRole.Seller || req.user.role === UserRole.Buyer)
    ) {
      throw Boom.forbidden(`User does not have permission`)
    }
    const id = parseInt(req.params.id)
    const product = await Product.findByPk(id)

    if (product) {
      res.send(product)
    } else {
      throw Boom.notFound(`Can't find ${id}`)
    }
  }
)

router.patch(
  '/products/:id',
  authorizeJWT,
  async (req: PatchProductByIdRequest, res: Response<Product>) => {
    if (req.user?.role !== UserRole.Seller) {
      throw Boom.forbidden()
    }

    const id = parseInt(req.params.id)

    const product = await Product.findByPk(id)
    if (!product) {
      throw Boom.notFound(`Can't find ${id}`)
    }

    const { id: _, ...updateAttributes } = req.body

    await product.update(updateAttributes)
    await product.reload()

    res.send(product)
  }
)

router.delete(
  '/products/:id',
  authorizeJWT,
  // Modify the Response generic to that of the return type passed to res.send()
  async (req: DeleteProductByIdRequest, res: Response<{ id: number }>) => {
    // Modify the code here
    if (req.user && req.user.role !== UserRole.Seller) {
      throw Boom.forbidden(`User does not have permission`)
    }
    const id = parseInt(req.params.id)

    const product = await Product.findByPk(id)
    if (!product) {
      throw Boom.notFound(`Can't find ${id}`)
    }

    await product.destroy()

    res.send({ id: product.id })
  }
)

export default router
