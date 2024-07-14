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
}
