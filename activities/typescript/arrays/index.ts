// Only modify the type of this variable. Do not modify its value
export const productPrices: null[] = [10, 20, 30, 50]

const enum CurrencyCode {
  USD = 'usd',
  GBP = 'gbp',
  EUR = 'eur',
}

// Do not modify the value. Only modify the type information
export const acceptedCurrencies: null[] = [
  CurrencyCode.EUR,
  CurrencyCode.GBP,
  CurrencyCode.USD,
]

interface Product {
  name: string
  description: string
}

// Only modify the type of this variable. Do not modify its value
export const allProducts: null[] = [
  {
    name: 'Kitchen Towel',
    description: 'Absorbent kitchen towel',
  },
  {
    name: 'Kitchen Mat',
    description: 'Comfortable kitchen mat',
  },
]

// Modify the value such that it accesses the value of `allProducts` at index 0
export const elementAtIndex0 = null

// Modify the value such that it accesses the value of `allProducts` at index 1
export const elementAtIndex1 = null
