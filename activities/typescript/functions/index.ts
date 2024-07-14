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
export function getProductDescription(product: ProductWithDiscount): null {
  // Do not modify this
  return product.description
}

// Only modify the parameter type and return type of this function
export function getProductDiscount(product: null): null {
  // Do not modify this
  return product.discount
}

// Only modify the parameter type and return type of this function
export function modifyProductName(product: null, { name }: null): null {
  // Do not modify this
  product.name = name
  return product
}

// Only modify the parameter type and return type of this function
export function modifyProductDiscount(product: null, { discount }: null): null {
  // Do not modify this
  product.discount = discount
  return product
}

// Do not modify the parameter type and return type of this function
export function addToShoppingCart(
  product: ProductWithDiscount,
  shoppingCart: ProductWithDiscount[]
): ProductWithDiscount[] {
  // Add code logic here

  return shoppingCart
}

// Do not modify the parameter type and return type of this function
export function removeFromShoppingCart(
  index: number,
  shoppingCart: ProductWithDiscount[]
): ProductWithDiscount[] {
  // Add code logic here

  // Do not modify the return value here
  return shoppingCart
}

// Do not modify the parameter type and return type of this function
export function updateProduct(
  product: ProductWithDiscount,
  attributesToUpdate: { name?: string; price?: number; description?: string }
): ProductWithDiscount {
  // Add code logic here

  // Do not modify the return value here
  return product
}
