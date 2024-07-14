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

// Only modify this type
interface Product {
  name: null
}

// Do not modify this
export const product1: Product = {
  name: 'Bathroom Slippers',
  price: 42,
  currency: CurrencyCode.USD,
  description: "The most comfy slippers you'll ever wear in the bathroom",
}

// Do not modify this
export const product2: Product = {
  name: 'Towel',
  price: 20,
  currency: CurrencyCode.GBP,
  description: "The most comfy towel you'll ever use in the bathroom",
  discount: {
    percentage: 0.2,
    type: DiscountType.ANNUAL_SALE,
  },
}

interface DiscountInfo {
  percentage: number
  type: DiscountType
}

// Only change the type of discountInfo here
export let discountInfo: undefined = null

discountInfo = {
  percentage: 0.5,
  type: DiscountType.CHRISTMAS,
}

interface Category {
  name: string
}

// Only change the type here
type CategoryWithTags = null

// Only change the type here
type CategoryWithRanking = null

// Do not modify this
export const categoryWithTags: CategoryWithTags[] = [
  { name: 'Electronics', tags: ['Mobile Phone', 'Television'] },
  { name: 'Apparel', tags: ['Shirt'] },
]

// Do not modify this
export const categoryWithRanking: CategoryWithRanking[] = [
  { name: 'Electronics', ranking: 1 },
  { name: 'Apparel', ranking: 2 },
]
