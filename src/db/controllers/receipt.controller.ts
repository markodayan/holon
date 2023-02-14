import { Receipt, Transaction } from '@db/entities/index.entities';

async function create(r: ReceiptBody) {
  const receipt = Receipt.create(r as Receipt);
  try {
    return await receipt.save();
  } catch (err) {
    console.error(err);
    throw new Error('[db controller] Create receipt failure');
  }
}

export { create };
