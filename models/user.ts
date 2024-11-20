import { UserRole } from '../controllers/users/types'
import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  Model,
  Unique,
  DataType,
} from 'sequelize-typescript'

@Table({ tableName: 'user' })
export default class UserModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number

  @Unique
  @Column(DataType.STRING)
  username: string

  @Column(DataType.STRING)
  password: string

  @Column(DataType.STRING)
  role?: UserRole
}
