import db from '../index';
import { entity, InsertEntity, SelectEntity } from '../schema';
import { sql } from 'drizzle-orm';

export async function getEntityById(id: SelectEntity['id']) {
  return await db.select().from(entity).where(sql`${entity.id} = ${id}`);
}

export async function getEntitiesByProjectId(projectId: SelectEntity['projectId']) {
  return await db.select().from(entity).where(sql`${entity.projectId} = ${projectId}`);
}

export async function createEntity(entityData: InsertEntity) {
  await db.insert(entity).values(entityData);
}

export async function updateEntity(id: SelectEntity['id'], entityData: InsertEntity) {
  return await db.update(entity).set(entityData).where(sql`${entity.id} = ${id}`);
}

export async function deleteEntity(id: SelectEntity['id']){
  return await db.delete(entity).where(sql`${entity.id} = ${id}`);
}