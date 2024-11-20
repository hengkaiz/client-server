import { Request, Response, Router } from 'express'

const router: Router = Router()

router.get(
  '/http-headers',
  async (req: Request, res: Response<{ 'secret-header'?: string }>) => {
    const headerValue = req.header('secret-header')
    return res.send({
      'secret-header': headerValue,
    })
  }
)

export default router
