import { Request, Response } from 'express';
import * as flow from '@db/controllers/flow.controller';

async function getFlowsByAddress(req: Request<{}, {}, {}, { address: string }>, res: Response) {
  const { address } = req.query;

  console.log('address:', address);

  try {
    let flows = await flow.getFlowsByAddress(address);

    res.status(200).json(flows);
  } catch (err) {
    console.error('failed to fetch flows by address');
    console.error(err);
    res.status(400).send('Bad request');
  }
}

export { getFlowsByAddress };
