import { Flow, Account } from '@db/entities/index.entities';

async function create(from: Account, to: Account): Promise<Flow> {
  const flow = Flow.create({
    to,
    from,
  });

  try {
    return await flow.save();
  } catch (err) {
    console.error(err);
    throw new Error('[db controller] Create flow failure (from, to)');
  }
}
async function createConvergent(to: Account): Promise<Flow> {
  const flow = Flow.create({
    to,
  });

  try {
    return await flow.save();
  } catch (err) {
    console.error(err);
    throw new Error('[db controller] Create convergent flow failure (*, to)');
  }
}

async function createDivergent(from: Account): Promise<Flow> {
  const flow = Flow.create({
    from,
  });

  try {
    return await flow.save();
  } catch (err) {
    console.error(err);
    throw new Error('[db controller] Create divergent flow failure (from, *)');
  }
}

async function getAccountFlows(acc: Account): Promise<Flow[]> {
  try {
    return await Flow.createQueryBuilder('flow')
      .leftJoinAndSelect('flow.from', 'from')
      .leftJoinAndSelect('flow.to', 'to')
      .where('flow.from = :address OR flow.to = :address', { address: acc.address })
      .getMany();
  } catch (err) {
    console.error(err);
    throw new Error('[db controller] get flows by account failure');
  }
}

async function getFlowsByAddress(address: string): Promise<Flow[]> {
  try {
    return await Flow.createQueryBuilder('flow')
      .leftJoinAndSelect('flow.from', 'from')
      .leftJoinAndSelect('flow.to', 'to')
      .where('flow.from.address = :address OR flow.to.address = :address', { address })
      .getMany();
  } catch (err) {
    console.error(err);
    throw new Error('[db controller] get flows by address failure');
  }
}

async function getAll(): Promise<Flow[]> {
  try {
    return await Flow.createQueryBuilder('flow')
      .leftJoinAndSelect('flow.from', 'from')
      .leftJoinAndSelect('flow.to', 'to')
      .getMany();
  } catch (err) {
    console.error(err);
    throw new Error('[db controller] Get all flows failure');
  }
}

export { create, createConvergent, createDivergent, getAll, getAccountFlows, getFlowsByAddress };
