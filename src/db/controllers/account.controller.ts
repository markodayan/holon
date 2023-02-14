import { Account, Rollup } from '@db/entities/index.entities';

async function create(
  address: string,
  label: string,
  isContract: boolean,
  description: string,
  rollup: Rollup
): Promise<Account> {
  const account = Account.create({
    address,
    label,
    description,
    is_contract: isContract,
  });

  if (rollup) {
    account.rollup = rollup;
  }

  try {
    return await account.save();
  } catch (err) {
    console.error(err);
    throw new Error('[db controller] Create account failure');
  }
}

type AccountParams = 'address' | 'label';

async function getBy(param: AccountParams, value: string): Promise<Account | null> {
  try {
    return await Account.findOneBy({
      [param]: value,
    });
  } catch (err) {
    console.error(err);
    throw new Error(`[db controller] Get account by ${param} failure`);
  }
}

export { create, getBy };
