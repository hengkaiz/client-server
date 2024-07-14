import { Request, Response, Router } from 'express'

const router: Router = Router()

router.get(
  '/http-headers',
  // Modify the Response generic to that of the return type passed to res.send()
  async (req: Request, res: Response<null>) => {
    return res.send({})
  }
)

export default router
