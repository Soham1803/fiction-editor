import db from '../index';
import { beats, InsertBeats, SelectBeats } from '../schema';
import { sql } from 'drizzle-orm';

export async function getBeatById(id: SelectBeats['id']) {
  return await db.select().from(beats).where(sql`${beats.id} = ${id}`);
}

export async function getBeatsByProjectId(projectId: SelectBeats['projectId']) {
    return await db.select().from(beats).where(sql`${beats.projectId} = ${projectId}`);
}

export async function createBeat(beatData: InsertBeats) {
  await db.insert(beats).values(beatData);
}

export async function updateBeat(id: string, beatData: InsertBeats) {
  const _id = parseInt(id);
  return await db.update(beats).set(beatData).where(sql`${beats.id} = ${_id}`);
}

export async function deleteBeat(id: string){
  const _id = parseInt(id);
  return await db.delete(beats).where(sql`${beats.id} = ${_id}`);
}
