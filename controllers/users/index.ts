import * as Boom from '@hapi/boom'
import * as bcrypt from 'bcrypt'
import { Response, Router } from 'express'
import jwt from 'jsonwebtoken'

import { JWT_SECRET_KEY } from '../../controllers/users/constants'

import { LoginUserRequest, RegisterUserRequest } from './types'

import UserModel from '../../models/user'

const router: Router = Router()

router.post(
  '/user/register',
  async (req: RegisterUserRequest, res: Response) => {
    // Parse and validate request body
    if (!req.body.username || !req.body.password) {
      throw Boom.badRequest('Username and Password must be provided')
    }

    const user = req.body

    // Register new user
    const userModel = await UserModel.findOne({
      where: { username: user.username },
    })

    if (userModel) {
      throw Boom.badRequest('User already exists')
    }

    // Hashing and generation of jwt token here
    const hashedPassword = await bcrypt.hash(user.password, 10)

    await UserModel.create({
      username: user.username,
      password: hashedPassword,
      role: user.role,
    })

    return res.send({ username: user.username })
  }
)

router.post('/user/login', async (req: LoginUserRequest, res: Response) => {
  const user = req.body

  // Find user in User table
  const { username, password } = user

  const userModel = await UserModel.findOne({
    where: { username },
  })

  if (!userModel) {
    throw Boom.notFound('User not found')
  }

  // Validate username and password against User table
  if (!bcrypt.compareSync(password, userModel.password)) {
    throw Boom.unauthorized('Invalid password')
  }

  // Generate jwt token
  const jwtToken = jwt.sign(
    { username, role: userModel.role },
    JWT_SECRET_KEY,
    {
      expiresIn: '1h',
    }
  )

  // Return username and generated jwt token
  return res.send({ username, jwtToken })
})

export default router
