import { Rollup } from '@db/entities/index.entities';

async function create(label: string, description: string): Promise<Rollup> {
  const rollup = Rollup.create({
    label,
    description,
  });

  try {
    return await rollup.save();
  } catch (err) {
    console.error(err);
    throw new Error('[db controller] Create rollup failure');
  }
}

async function getById(id: number) {
  try {
    return await Rollup.findOneBy({
      id,
    });
  } catch (err) {
    console.error(err);
    throw new Error('[db controller] Get rollup by id failure');
  }
}

async function getByLabel(label: string) {
  try {
    return await Rollup.findOneBy({
      label,
    });
  } catch (err) {
    console.error(err);
    throw new Error('[db controller] Get rollup by label failure');
  }
}

export { create, getById, getByLabel };
