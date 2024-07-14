enum DiscountType {
  MEMBER = 'member',
  CHRISTMAS_SALE = 'christmas_sale',
  NEW_YEAR = 'new_year',
}

interface Product {
  name: string
  description: string
  price: number
  discount?: {
    type: DiscountType
    percentage: number
  }
}

const products: Product[] = [
  {
    name: 'Bathroom Towel',
    description: 'Most absorbent towel',
    price: 30,
  },
  {
    name: 'Bathroom Soap Dispenser',
    description: 'Most efficient dispenser',
    price: 30,
    discount: {
      type: DiscountType.NEW_YEAR,
      percentage: 0.2,
    },
  },
  {
    name: 'Bathroom Slippers',
    description: 'Most comfortable slippers',
    price: 100,
    discount: {
      type: DiscountType.CHRISTMAS_SALE,
      percentage: 0.1,
    },
  },
  {
    name: 'Bathroom Brush',
    description: '',
    price: 35,
  },
  {
    name: '',
    description: 'The best hanger',
    price: 50,
  },
]

// Do not modify the function declaration or signature
export function getProductWithPrice30() {
  // Make use of array functions to return the correct array of products
  return products
}

// Do not modify the function declaration or signature
export function getProductsWithDiscount() {
  // Make use of array functions to return the correct array of products
  return products
}

// Do not modify the function declaration or signature
export function getProductsWithPriceBelow100() {
  // Make use of array functions to return the correct array of products
  return products
}

// Do not modify the function declaration or signature
export function getProductDescriptions() {
  // Make use of array functions to return the correct array of products
  return products
}

// Do not modify the function declaration or signature
export function getProductNames() {
  // Make use of array functions to return the correct array of products
  return products
}

// Do not modify the function declaration or signature
export function getProductIndex() {
  // Make use of array functions to find the product's index and return it
  return products
}
