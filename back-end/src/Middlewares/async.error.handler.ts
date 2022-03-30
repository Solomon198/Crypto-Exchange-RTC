import { Request, Response, NextFunction } from 'express';

export default function HandleAsyncFactory(
  controllerFunction: Function,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controllerFunction(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
