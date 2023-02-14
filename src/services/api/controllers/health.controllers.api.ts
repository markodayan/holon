import { Request, Response } from 'express';

async function healthCheck(req: Request, res: Response) {
  return res.status(200).json({
    message: 'Hello World',
  });
}

export { healthCheck };
