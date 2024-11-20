import { Request } from 'express'

/** General User Interface(s) */
export enum UserRole {
  Buyer = 'BUYER',
  Seller = 'SELLER',
}

export interface IUser {
  id?: number
  username: string
  password: string
  role?: UserRole
}

/** Create User Request Interface(s) */
export interface IUserRequest {
  username: string
  role?: UserRole
}

// Modify the type here
export interface RegisterUserRequest extends Request {
  body: Omit<IUser, 'id'>
}

// Modify the type here
export interface LoginUserRequest extends Request {
  body: Omit<IUser, 'id'>
}
