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
    throw new Error('Create account failure');
  }
}

async function getByAddress(address: string) {
  try {
    return await Account.findOneBy({
      address,
    });
  } catch (err) {
    console.error(err);
    throw new Error('Get account by address failure');
  }
}

export { create, getByAddress };
