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
    throw new Error('Create flow failure (to,from)');
  }
}

async function getAll(): Promise<Flow[]> {
  try {
    return await Flow.createQueryBuilder('flow')
      .leftJoinAndSelect('flow.from', 'from')
      .leftJoinAndSelect('flow.to', 'to')
      .leftJoinAndSelect('flow.abi', 'abi')
      .getMany();
  } catch (err) {
    console.error(err);
    throw new Error('Get all flows failure');
  }
}

export { create, getAll };
