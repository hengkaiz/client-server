export interface Product {
  name: string
  price: number
  description: string
}

export interface Discount {
  percentage: number
  type: string
}

type ProductWithDiscount = Product & { discount: Discount }

type Products = Product | ProductWithDiscount

const towel: Product = {
  name: 'Bathroom Towel',
  price: 30,
  description: 'The most absorbent bathroom towel',
}

const slippers: ProductWithDiscount = {
  name: 'Bathroom Slippers',
  price: 50,
  description: 'The most comfortable bathroom slippers',
  discount: {
    percentage: 0.5,
    type: 'sale',
  },
}

function modifyProductDescription<T extends Products>(
  product: T,
  description: string
): T {
  product.description = description

  return product
}

// Only modify the generics parameter of modifyProductDescription
const towelWithNewDescription = modifyProductDescription<Product>(
  towel,
  'The most most absorbent bathroom towel'
)

// Only modify the generics parameter of modifyProductDescription
const slippersWithNewDescription = modifyProductDescription<Product>(
  slippers,
  'The most most absorbent bathroom towel'
)

function modifyProductPrice<T extends Products>(product: T, price: number): T {
  product.price = price

  return product
}

// Only modify the generics parameter of modifyProductPrice
const towelWithNewPrice = modifyProductPrice<Product>(towel, 80)

// Only modify the generics parameter of modifyProductPrice
const slippersWithNewPrice = modifyProductPrice<Product>(slippers, 80)

interface ModifiableAttributes {
  name?: string
  price?: number
  description?: string
}

function modifyProductAttributes<
  T extends Products,
  U extends ModifiableAttributes
>(product: T, attributes: U): T {
  product.name = attributes.name || product.name
  product.price = attributes.price || product.price
  product.description = attributes.description || product.description
  return product
}

// Only modify the generics parameter of modifyProductAttributes
modifyProductAttributes<Product, ModifiableAttributes>(towel, {
  name: 'Softest Towel',
  price: 50,
})

// Only modify the generics parameter of modifyProductAttributes
modifyProductAttributes<Product, ModifiableAttributes>(slippers, {
  name: 'Ergonomic Slippers',
  price: 80,
})
