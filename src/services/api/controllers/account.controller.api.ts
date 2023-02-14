import { Request, Response } from 'express';
import * as account from '@db/controllers/account.controller';

type AccountParams = 'address' | 'label';
type AddressOrLabel = { address: string } | { label: string };

async function getAccountBy(req: Request<{}, {}, {}, AddressOrLabel>, res: Response) {
  const query = req.query;
  let key: AccountParams;
  let value: string;

  if ('address' in query) {
    key = 'address';
    value = query[key];
  } else if ('label' in query) {
    key = 'label';
    value = query[key];
  } else {
    return res.status(400).send('Invalid account param provided');
  }

  try {
    const result = await account.getBy(key, value);

    if (!result) {
      return res.status(400).send(`${key} value supplied does not exist`);
    }

    return res.status(200).json(result);
  } catch (err) {
    console.log('failed to fetch account by address');
    console.error(err);
    return res.status(500).send('Server failure');
  }
}

export { getAccountBy };
