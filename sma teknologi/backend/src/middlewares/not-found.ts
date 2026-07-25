import { Request, Response } from 'express'
import { NotFoundError } from '@shared/errors'

export const notFound = (req: Request, res: Response): void => {
  throw new NotFoundError(`Route ${req.method} ${req.path}`)
}