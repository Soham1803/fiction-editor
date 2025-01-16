import db from '../index';
import { world, InsertWorld, SelectWorld } from '../schema';
import { sql } from 'drizzle-orm';

export async function getWorldById(id: SelectWorld['id']) {
  return await db.select().from(world).where(sql`${world.id} = ${id}`);
}

export async function getWorldsByProjectId(projectId: SelectWorld['projectId']) {
    return await db.select().from(world).where(sql`${world.projectId} = ${projectId}`);
}

export async function createWorld(worldData: InsertWorld) {
  await db.insert(world).values(worldData);
}

export async function updateWorld(id: string, worldData: InsertWorld) {
  const _id = parseInt(id);
  return await db.update(world).set(worldData).where(sql`${world.id} = ${_id}`);
}

export async function deleteWorld(id: string){
  const _id = parseInt(id);
  return await db.delete(world).where(sql`${world.id} = ${_id}`);
}
