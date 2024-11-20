const products = [
  { name: 'Bathroom Towel', price: 100 },
  { name: 'Bathroom Slippers', price: 100 },
  { name: 'Bathroom Soap Dispenser', price: 100 },
]

/*
  Iterate through `products` with each item in the array passed as a parameter to the callback function

  The output of `findIndex()` is the first element where the expression evaluates to `true`
*/
const indexOfProductPricedAt100 = products.findIndex((product) => {
  return product.price === 100
})

/*
`Bathroom Towel`'s index is returned because it is the first item in the array even though
all other items are priced at `100` too


Output:
0

*/
console.log(indexOfProductPricedAt100)

/*
`Bathroom Towel`'s object is removed from `products` array
*/
products.splice(indexOfProductPricedAt100, 1)

/*
Output:
[{ name: 'Bathroom Slippers', price: 100}, { name: 'Bathroom Soap Dispenser', price: 100}];
*/
console.log(products)
