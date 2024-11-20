import * as Boom from '@hapi/boom'

import Product, { ProductCreationAttributes } from '../../models/product'
import ProductCategory from '../../models/product-category'

export async function getAllProducts(offset: number, limit: number) {
  // Modify the code here
  return []
}

export async function createProduct(attributes: ProductCreationAttributes) {
  // Modify the code here
  return {}
}

export async function getProductById(id: number) {
  // Modify the code here
  return {}
}

export async function updateProductById(
  id: number,
  attributes: Partial<ProductCreationAttributes>
) {
  // Modify the code here
  return {}
}

export async function deleteProductById(id: number) {
  // Modify the code here
  return {}
}

export async function getProductsByCategory(category: string) {
  // Modify the code here
  return {}
}
