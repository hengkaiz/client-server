import { Table, Column, Model, AllowNull, HasMany } from 'sequelize-typescript'
import Product from './product'

export interface ProductCategoryAttributes {
  id: number
  name: string
}

export interface ProductCategoryCreationAttributes
  extends Omit<ProductCategoryAttributes, 'id'> {}

@Table({ tableName: 'product_categories' })
export default class ProductCategory extends Model<
  ProductCategoryAttributes,
  ProductCategoryCreationAttributes
> {
  @AllowNull(false)
  @Column
  name: string

  @HasMany(() => Product)
  products: Product[]
}
