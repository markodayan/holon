import * as dotenv from 'dotenv';
dotenv.config();

import { CoreClient } from '@core/singleton/client';
import { fetchHostIP } from '@core/utils';
import { Account, Flow, Rollup } from '@db/entities/index.entities';
import { initDataStores } from '@db/index';
import { EOA_MAP, CONTRACT_MAP, RELATIONSHIPS } from 'src/seeder/optimism';

const host = fetchHostIP();

// keeps the service alive
setInterval(() => {}, 1 << 30);

/* Give the scraper websocket server time to initialise */
setTimeout(async () => {
  CoreClient.init(`ws://${host}:5000/eth`);

  await initDataStores();
  await initOptimism(EOA_MAP, CONTRACT_MAP, RELATIONSHIPS);

  // const ctc = await createAccount(
  //   '0x5e4e65926ba27467555eb562121fac00d24e9dd2',
  //   'CanonicalTransactionChain',
  //   'Optimism L2 batches posted here by sequencer',
  //   true,
  //   optimism
  // );

  // const sequencer = await createAccount(
  //   '0x6887246668a3b87f54deb3b94ba47a6f63f32985',
  //   'OptimismSequencer',
  //   'Sequencer EOA posting batches to Ethereum',
  //   false,
  //   optimism
  // );

  // const flow = Flow.create({
  //   from: sequencer,
  //   to: ctc,
  // });

  // await flow.save();
}, 5000);

async function createRollup(label: string, description: string) {
  const rollup = Rollup.create({
    label,
    description,
  });

  await rollup.save();

  return rollup;
}

async function createAccount(address: string, label: string, description = '', isContract: boolean, rollup?: any) {
  const account = Account.create({
    address,
    label,
    description,
    is_contract: isContract,
  });

  if (rollup) {
    account.rollup = rollup;
  }

  await account.save();

  return account;
}

async function createTransactionFlow(from: Account, to: Account) {
  const flow = Flow.create({
    from,
    to,
  });

  await flow.save();
}

async function initOptimism(eoaMap: any, contractMap: any, relationships: any) {
  // create rollup row
  const optimism = await createRollup('Optimism', 'Optimistic rollup developed by Optimism');

  // create eoa account rows (and store account instances for relationship population)
  let EOAs = {};
  for (const [label, address] of Object.entries(eoaMap)) {
    const account = await createAccount(address as string, label, '', false, optimism);

    (EOAs as any)[label] = account;
  }

  // create contract account rows (and store account instances for relationship population)
  let contracts = {};
  for (const [label, address] of Object.entries(contractMap)) {
    const account = await createAccount(address as string, label, '', true, optimism);

    (contracts as any)[label] = account;
  }

  // seed the relationships
  for (const r of relationships) {
    await createTransactionFlow(r.from, r.to);
  }
}
