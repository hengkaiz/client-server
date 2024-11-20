import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import ProductCategory from './product-category'

export interface ProductAttributes {
  id: number
  name: string
  description: string
  price: number
  currency: string
  productCategoryId: number
}

export interface ProductCreationAttributes
  extends Omit<ProductAttributes, 'id'> {}

@Table({ tableName: 'products' })
export default class Product extends Model<
  ProductAttributes,
  ProductCreationAttributes
> {
  @AllowNull(false)
  @Column
  name: string

  @AllowNull(false)
  @Column(DataType.TEXT)
  description: string

  @AllowNull(false)
  @Column(DataType.DECIMAL)
  price: number

  @AllowNull(false)
  @Column
  currency: string

  @ForeignKey(() => ProductCategory)
  @Column
  productCategoryId: number

  @BelongsTo(() => ProductCategory)
  productCategory: ProductCategory
}
