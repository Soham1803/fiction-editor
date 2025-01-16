import db from  '../index'; 
import { synopsis, InsertSynopsis, SelectSynopsis } from  '../schema';
import { sql } from 'drizzle-orm';

export async function getSynopsisById(id: SelectSynopsis['id']) {
  return await db.select().from(synopsis).where(sql`${synopsis.id} = ${id}`);
}

export async function getSynopsesByProjectId(projectId: SelectSynopsis['projectId']) {
    return await db.select().from(synopsis).where(sql`${synopsis.projectId} = ${projectId}`);
}

export async function createSynopsis(synopsisData: InsertSynopsis) {
  await db.insert(synopsis).values(synopsisData);
}

export async function updateSynopsis(id: string, synopsisData: InsertSynopsis) {
  const _id = parseInt(id);
  return await db.update(synopsis).set(synopsisData).where(sql`${synopsis.id} = ${_id}`);
}

export async function deleteSynopsis(id: string){
  const _id = parseInt(id);
  return await db.delete(synopsis).where(sql`${synopsis.id} = ${_id}`);
}
