export enum Currency {
  USD = 'usd',
  JPY = 'jpy',
  GBP = 'gbp',
}

export enum DiscountType {
  CHRISTMAS_SALE = 'christmas_sale',
  MEMBER = 'member',
  NEW_YEAR = 'new_year',
}

export interface Product {
  name: string
  description: string
  price: number
  currency: Currency
  discountType?: DiscountType
}

export function isProductPriceOver100(product: Product) {
  // Add missing condition here
  if () {
    return true
  }

  return false
}

export function productHasValidName(product: Product) {
  // Add missing condition here
  if () {
    return true
  }

  return false
}

export function getDiscountedPriceByDiscountType(product: Product) {
  // Add missing condition here
  if () {
  }

  return product.price
}

export function getDiscountedPriceByCurrency(product: Product) {
  // Add missing condition here

  if () {
    return product.price * 0.9
  }

  return product.price
}
