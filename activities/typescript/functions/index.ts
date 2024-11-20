enum DiscountType {
  CHRISTMAS = 'christmas',
  ANNUAL_SALE = 'annual_sale',
}

interface Product {
  name: string
  price: number
  description: string
}

interface Discount {
  percentage: number
  type: DiscountType
}

type ProductWithDiscount = Product & { discount: Discount }

// Only modify the parameter type and return type of this function
export function getProductDescription(product: Product): string {
  // Do not modify this
  return product.description
}

// Only modify the parameter type and return type of this function
export function getProductDiscount(product: ProductWithDiscount): Discount {
  // Do not modify this
  return product.discount
}

// Only modify the parameter type and return type of this function
export function modifyProductName(
  product: Product,
  { name }: { name: string }
): Product {
  // Do not modify this
  product.name = name
  return product
}

// Only modify the parameter type and return type of this function
export function modifyProductDiscount(
  product: ProductWithDiscount,
  { discount }: { discount: Discount }
): ProductWithDiscount {
  // Do not modify this
  product.discount = discount
  return product
}

// Do not modify the parameter type and return type of this function
export function addToShoppingCart(
  product: Product,
  shoppingCart: Product[]
): Product[] {
  // Modify the code logic here

  shoppingCart.push(product)

  return shoppingCart
}

// Do not modify the parameter type and return type of this function
export function removeFromShoppingCart(
  index: number,
  shoppingCart: Product[]
): Product[] {
  // Modify the code logic here
  shoppingCart.splice(index, 1)

  // Do not modify the return value here
  return shoppingCart
}

// Do not modify the parameter type and return type of this function
export function updateProduct(
  product: Product,
  attributesToUpdate: { name?: string; price?: number; description?: string }
): Product {
  // Modify the code logic here

  Object.assign(product, attributesToUpdate)

  // Do not modify the return value here
  return product
}
