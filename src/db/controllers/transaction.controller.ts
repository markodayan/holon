import { Transaction, Flow } from '@db/entities/index.entities';

/**
 * Write this transaction to the database (it must be associated with a known flow!)
 * @param tx  -includes the flow relationship
 * @returns {Promise<Transaction>}
 */
async function create(tx: TransactionBody) {
  const transaction = Transaction.create(tx as Transaction);
  try {
    return await transaction.save();
  } catch (err) {
    console.error(err);
    throw new Error('Create transaction failure');
  }
}

export { create };
