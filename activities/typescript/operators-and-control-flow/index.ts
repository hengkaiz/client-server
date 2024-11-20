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
  if (product.price > 100) {
    return true
  }

  return false
}

export function productHasValidName(product: Product) {
  // Add missing condition here
  if (product.name) {
    return true
  }

  return false
}

export function getDiscountedPriceByDiscountType(product: Product) {
  // Add missing condition here
  if (product.discountType) {
    if (product.discountType === DiscountType.CHRISTMAS_SALE) {
      return product.price * 0.9
    } else if (product.discountType === DiscountType.MEMBER) {
      return product.price * 0.8
    } else if (product.discountType === DiscountType.NEW_YEAR) {
      return product.price * 0.7
    }
  }

  return product.price
}

export function getDiscountedPriceByCurrency(product: Product) {
  // Add missing condition here

  if (product.currency === 'usd' && product.price >= 100) {
    return product.price * 0.9
  }

  return product.price
}
