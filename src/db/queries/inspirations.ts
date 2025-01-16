import db from '../index';
import { inspirations, InsertInspirations, SelectInspirations } from '../schema';
import { sql } from 'drizzle-orm';

export async function getInspirationById(id: SelectInspirations['id']) {
  return await db.select().from(inspirations).where(sql`${inspirations.id} = ${id}`);
}

export async function getInspirationsByProjectId(projectId: SelectInspirations['projectId']) {
    return await db.select().from(inspirations).where(sql`${inspirations.projectId} = ${projectId}`);
}

export async function createInspiration(inspirationData: InsertInspirations) {
  await db.insert(inspirations).values(inspirationData);
}

export async function updateInspiration(id: string, inspirationData: InsertInspirations) {
  const _id = parseInt(id);
  return await db.update(inspirations).set(inspirationData).where(sql`${inspirations.id} = ${_id}`);
}

export async function deleteInspiration(id: string){
  const _id = parseInt(id);
  return await db.delete(inspirations).where(sql`${inspirations.id} = ${_id}`);
}