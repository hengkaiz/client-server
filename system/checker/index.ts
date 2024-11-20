import Boom from '@hapi/boom'
import * as bcrypt from 'bcrypt'
import { exec } from 'child_process'
import { Request, Response, Router } from 'express'
import * as _ from 'lodash'
import { promisify } from 'node:util'

import { PRODUCTS } from '../../controllers/http/constants'
import {
  Product,
  ProductCreationAttributes,
} from '../../controllers/http/types'

import { getCurrentActivity } from '../../activities/typescript'

import ProductModel from '../../models/product'
import ProductCategoryModel from '../../models/product-category'
import UserModel from '../../models/user'

function buildTypescriptErrorMessage(
  expected: any,
  received: any,
  varName: string
) {
  return `Please ensure that the logic of function \`${varName}\` is correct and only the specified portions have been modified.

  Expected:
  \`\`\`ts
  ${JSON.stringify(expected, undefined, 4)}
  \`\`\`

  Received:
  \`\`\`ts
  ${JSON.stringify(received, undefined, 4)}
  \`\`\`
  `
}

const execAsync = promisify(exec)

const router = Router()

const PATH_PREFIX = '/checker'

let i = 0
function generateId() {
  return i++
}

router.get(
  `${PATH_PREFIX}/http/products`,
  (req: Request, res: Response<Product[]>) => {
    res.send(PRODUCTS)
  }
)

router.get(
  `${PATH_PREFIX}/http/products/:id`,
  (req: Request, res: Response<Product | { product: null }>) => {
    const product = PRODUCTS.find(
      (product) => product.id === parseInt(req.params.id)
    )
    res.send(product ? product : { product: null })
  }
)

interface HttpPostCreateProductRequest {
  body: ProductCreationAttributes
}

router.post(
  `${PATH_PREFIX}/http/products`,
  (req: Request<HttpPostCreateProductRequest>, res: Response) => {
    const product = {
      id: generateId(),
      ...req.body,
    }
    PRODUCTS.push(product)

    return res.send(product)
  }
)

router.post(
  `${PATH_PREFIX}/http/products/truncate`,
  (req: Request, res: Response) => {
    while (PRODUCTS.length > 0) {
      PRODUCTS.pop()
    }

    return res.send()
  }
)

router.post(
  `${PATH_PREFIX}/products/truncate`,
  async (req: Request, res: Response<ProductModel>, next) => {
    await ProductModel.truncate()

    return res.send()
  }
)

interface PostCreateProductRequest extends Request {
  body: {
    name: string
    description: string
    price: number
    currency: string
  }
}

router.post(
  `${PATH_PREFIX}/products`,
  async (req: PostCreateProductRequest, res: Response<ProductModel>, next) => {
    let product: ProductModel
    try {
      product = await ProductModel.create({
        ...req.body,
      } as any)
    } catch (e) {
      const error = e as Error
      return next(Boom.badRequest(error.message))
    }

    return res.send(product)
  }
)

router.get(
  `${PATH_PREFIX}/products`,
  async (
    req: PostCreateProductRequest,
    res: Response<ProductModel[]>,
    next
  ) => {
    let products = []
    try {
      products = await ProductModel.findAll({
        ...req.body,
      } as any)
    } catch (e) {
      const error = e as Error
      return next(Boom.badRequest(error.message))
    }

    return res.send(products)
  }
)

interface GetProductByIdRequest {
  params: {
    id: string
  }
}

router.get(
  `${PATH_PREFIX}/products/:id`,
  async (req: GetProductByIdRequest, res: Response<ProductModel>, next) => {
    let product: ProductModel | null = null
    try {
      product = await ProductModel.findOne({
        where: {
          id: req.params.id,
        },
      } as any)
    } catch (e) {
      const error = e as Error
      return next(Boom.badRequest(error.message))
    }

    if (!product) {
      throw Boom.notFound()
    }

    return res.send(product)
  }
)

interface GetUserByUsername {
  body: {
    username: string
  }
}

router.post(
  `${PATH_PREFIX}/users/by-username`,
  async (req: GetUserByUsername, res: Response<UserModel>, next) => {
    let user: any
    try {
      user = await UserModel.findOne({
        ...req.body,
      } as any)
    } catch (e) {
      const error = e as Error
      return next(Boom.badRequest(error.message))
    }

    return res.send(user)
  }
)

interface PostCreateCategoryRequest {
  body: {
    name: string
  }
}

router.post(
  `${PATH_PREFIX}/product-categories`,
  async (
    req: PostCreateCategoryRequest,
    res: Response<ProductCategoryModel>,
    next
  ) => {
    let productCategory: ProductCategoryModel
    try {
      productCategory = await ProductCategoryModel.create({
        ...req.body,
      } as any)
    } catch (e) {
      const error = e as Error
      return next(Boom.badRequest(error.message))
    }

    return res.send(productCategory)
  }
)

router.post(
  `${PATH_PREFIX}/product-and-product-categories`,
  async (
    req: any,
    res: Response<{
      product: ProductModel
      productCategory: ProductCategoryModel
    }>
  ) => {
    let product: ProductModel, productCategory: ProductCategoryModel
    try {
      productCategory = await ProductCategoryModel.create({
        name: 'test_category',
      })
      product = await ProductModel.create({
        name: 'test',
        description: 'test',
        currency: 'USD',
        price: 10,
        productCategoryId: productCategory.id,
      } as any)
    } catch (e) {
      const error = e as Error
      throw Boom.badRequest(error.message)
    }

    return res.send({ product, productCategory })
  }
)

router.get(
  `${PATH_PREFIX}/product-with-category/:id`,
  async (req: Request, res: Response<ProductModel | null>) => {
    const product = await ProductModel.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: ProductCategoryModel,
          required: true,
        },
      ],
    })

    return res.send(product)
  }
)

router.post(
  `${PATH_PREFIX}/user-without-role`,
  async (req: Request, res: Response) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await UserModel.create({
      username: req.body.username,
      password: hashedPassword,
    })

    return res.send(user)
  }
)

router.post(
  `${PATH_PREFIX}/user-with-role`,
  async (req: Request, res: Response) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await UserModel.create({
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role,
    })

    return res.send(user)
  }
)

interface FoundationCheckerRequest extends Request {
  body: {
    activityName: string
    hasLogic?: boolean
    checks: {
      checkIdentifier: string
      varName: string
      isFunction: boolean
      parameters: string
      expectedOutput: any
    }[]
  }
}

interface TypescriptCheckResponseBodyActivityResultData {
  isFunction: boolean
  actualFunctionOutput?: any
  actualVariableOutput?: any
}
interface TypescriptCheckResponseBody {
  typescriptResult?: {
    errorMessage: string
  }
  eslintResult?: {
    errorMessage: string
  }
  activityResults?: {
    [checkIdentifier: string]: TypescriptCheckResponseBodyActivityResultData
  }
}

router.post(
  `${PATH_PREFIX}/typescript-checker`,
  async (
    req: FoundationCheckerRequest,
    res: Response<TypescriptCheckResponseBody>
  ) => {
    const { activityName, checks } = req.body

    const [typescriptResult, eslintResult] = await Promise.allSettled([
      execAsync(`npx tsc -p activities/typescript/${activityName}/ --noEmit`),
      execAsync(
        `npx eslint activities/typescript/${activityName}/ --format=json`
      ),
    ])

    if (typescriptResult.status === 'rejected') {
      return res.send({
        typescriptResult: {
          errorMessage: typescriptResult.reason,
        },
      })
    } else {
    }

    if (eslintResult.status === 'rejected') {
      return res.send({
        eslintResult: {
          errorMessage: eslintResult.reason,
        },
      })
    }

    /* 
      Load only the specific activity we are checking for or the server will crash
      if the typescript compilation does not succeed on other activities
    */
    const activity = await getCurrentActivity(activityName)

    const activityResultKeyValueMap = new Map<
      string,
      TypescriptCheckResponseBodyActivityResultData
    >()

    await Promise.all(
      checks.map(async (check) => {
        const { varName, isFunction, parameters, checkIdentifier } = check
        if (isFunction) {
          if (typeof activity[varName] !== 'function') {
            return activityResultKeyValueMap.set(checkIdentifier, {
              isFunction: false,
            })
          }

          // Always pass parameters in array form and expect it to be spread through spread operator
          const output = await activity[varName](...parameters)
          return activityResultKeyValueMap.set(checkIdentifier, {
            isFunction: true,
            actualFunctionOutput: output,
          })
        }

        return activityResultKeyValueMap.set(checkIdentifier, {
          isFunction: false,
          actualVariableOutput: activity[varName],
        })
      })
    )

    return res.send({
      activityResults: Object.fromEntries(activityResultKeyValueMap),
    })
  }
)

export default router
