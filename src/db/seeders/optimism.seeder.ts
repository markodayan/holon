import * as account from '@db/controllers/account.controller';
import * as rollup from '@db/controllers/rollup.controller';
import * as flow from '@db/controllers/flow.controller';

async function seed(eoaMap: any, contractMap: any, relationships: any) {
  // create rollup row
  const optimism = await rollup.create('Optimism', 'Optimistic rollup developed by Optimism');

  // create eoa account rows (and store account instances for relationship population)
  let EOAs = {};
  for (const [label, address] of Object.entries(eoaMap)) {
    const acc = await account.create(address as string, label, false, '', optimism);

    (EOAs as any)[label] = acc;
  }

  // create contract account rows (and store account instances for relationship population)
  let contracts = {};
  for (const [label, address] of Object.entries(contractMap)) {
    const acc = await account.create(address as string, label, true, '', optimism);

    (contracts as any)[label] = acc;
  }

  // seed the relationships
  for (const r of relationships) {
    await flow.create(r.from, r.to);
  }
}

export { seed };
