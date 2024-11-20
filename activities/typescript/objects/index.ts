// Only modify the type of this variable. Do not modify its value
export const category: { id: number; name: string } = {
  id: 1,
  name: 'Electronics',
}

const enum DiscountType {
  ANNUAL_SALE = 'annual_sale',
  CHRISTMAS = 'christmas',
  NEW_YEAR = 'new_year',
}

const enum CurrencyCode {
  USD = 'usd',
  GBP = 'gbp',
  EUR = 'eur',
}

// Only modify the type information in this interface
interface Product {
  name: string
  price: number
  currency: CurrencyCode
  description: string
  discount: {
    percentage: number
    type: DiscountType
  }
}

// Do not modify this
export const product1: Product = {
  name: 'Bathroom Slippers',
  price: 42,
  currency: CurrencyCode.USD,
  description: "The most comfortable slippers you'll ever wear in the bathroom",
  discount: {
    percentage: 0.2,
    type: DiscountType.ANNUAL_SALE,
  },
}

// Do not modify this
export const product2: Product = {
  name: 'Bathroom Towel',
  price: 20,
  currency: CurrencyCode.GBP,
  description: "The most comfortable towel you'll ever use in the bathroom",
  discount: {
    percentage: 0.2,
    type: DiscountType.CHRISTMAS,
  },
}

// Do not modify this
export const product3: Product = {
  name: 'Bathroom Mat',
  price: 15,
  currency: CurrencyCode.EUR,
  description: "The most comfortable mat you'll have in the bathroom",
  discount: {
    percentage: 0.2,
    type: DiscountType.NEW_YEAR,
  },
}
