import { Request, Response } from 'express';
import * as transaction from '@db/controllers/transaction.controller';

async function getTransactionsByFlowId(req: Request, res: Response) {
  try {
    let transactions = await transaction.getByParams('flow', 2);

    res.status(200).json(transactions);
  } catch (err) {
    console.error('failed to fetch transactions by flow id');
    console.error(err);
    res.status(400).send('Bad request');
  }
}

export { getTransactionsByFlowId };
