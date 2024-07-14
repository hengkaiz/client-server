import * as Boom from '@hapi/boom'
import { Response, Router } from 'express'

import { LoginUserRequest, RegisterUserRequest } from './types'

import { loginUser, registerUser } from '../../services/users'

const router: Router = Router()

router.post(
  '/user/register',
  // Modify the Response generic to that of the return type passed to res.send()
  async (req: RegisterUserRequest, res: Response<null>) => {
    // Modify the code here
    return res.send({})
  }
)

router.post(
  '/user/login',
  // Modify the Response generic to that of the return type passed to res.send()
  async (req: LoginUserRequest, res: Response<null>) => {
    // Modify the code here
    return res.send({})
  }
)

export default router
