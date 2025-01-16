import db from '../index';
import { lore, InsertLore, SelectLore } from '../schema';
import { sql } from 'drizzle-orm';

export async function getLoreById(id: SelectLore['id']) {
  return await db.select().from(lore).where(sql`${lore.id} = ${id}`);
}

export async function getLoreByProjectId(projectId: SelectLore['projectId']) {
    return await db.select().from(lore).where(sql`${lore.projectId} = ${projectId}`);
}

export async function createLore(loreData: InsertLore) {
  await db.insert(lore).values(loreData);
}

export async function updateLore(id: string, loreData: InsertLore) {
  const _id = parseInt(id);
  return await db.update(lore).set(loreData).where(sql`${lore.id} = ${_id}`);
}

export async function deleteLore(id: string){
  const _id = parseInt(id);
  return await db.delete(lore).where(sql`${lore.id} = ${_id}`);
}