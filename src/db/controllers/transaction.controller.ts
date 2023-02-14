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
    throw new Error('[db controller] Create transaction failure');
  }
}

type TransactionsParams = 'flow';

async function getByParams(param: TransactionsParams, value: number): Promise<Transaction[]> {
  const queryBuilder = Transaction.createQueryBuilder('transaction');

  switch (param) {
    case 'flow':
      queryBuilder.where('transaction.flowId = :value', { value });
      break;
    default:
      throw new Error(`[db controller] Invalid transaction param: ${param}`);
  }

  try {
    return await queryBuilder.getMany();
  } catch (err) {
    console.error(err);
    throw new Error('[db controller] get transaction by flow query failure');
  }
}

export { create, getByParams };
