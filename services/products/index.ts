import * as Boom from '@hapi/boom'

import Product, { ProductCreationAttributes } from '../../models/product'
import ProductCategory from '../../models/product-category'

export async function getAllProducts(offset: number, limit: number) {
  return Product.findAll({
    offset,
    limit,
    order: [['id', 'asc']],
  })
}

export async function createProduct(attributes: ProductCreationAttributes) {
  if (
    !attributes.name ||
    !attributes.price ||
    !attributes.description ||
    !attributes.currency
  ) {
    throw Boom.badRequest()
  }

  return Product.create(attributes)
}

export async function getProductById(id: number) {
  return Product.findOne({
    where: {
      id,
    },
  })
}

export async function updateProductById(
  id: number,
  attributes: Partial<ProductCreationAttributes>
) {
  return Product.update(attributes, {
    where: {
      id,
    },
  })
}

export async function deleteProductById(id: number) {
  return Product.destroy({
    where: {
      id,
    },
  })
}

export async function getProductsByCategory(category: string) {
  return Product.findAll({
    include: [{ model: ProductCategory, where: { name: category } }],
  })
}
