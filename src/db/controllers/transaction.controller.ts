import { Transaction } from '@db/entities/index.entities';

async function create(tx: TransactionBody) {
  const transaction = Transaction.create(tx as Transaction);
  try {
    console.log('doing the save?');
    return await transaction.save();
  } catch (err) {
    console.error(err);
    throw new Error('Create transaction failure');
  }
}

export { create };
