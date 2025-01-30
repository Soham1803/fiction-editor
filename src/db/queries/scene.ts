import db from '../index';
import { scene, InsertScene, SelectScene } from '../schema';
import { sql } from 'drizzle-orm';

export async function getSceneById(id: SelectScene['id']) {
  return await db.select().from(scene).where(sql`${scene.id} = ${id}`);
}

export async function getScenesByChapterId(chapterId: SelectScene['chapterId']) {
  return await db.select().from(scene).where(sql`${scene.chapterId} = ${chapterId}`);
}

export async function createScene(sceneData: InsertScene) {
  await db.insert(scene).values(sceneData);
}

export async function updateScene(id: SelectScene['id'], sceneData: InsertScene) {
  return await db.update(scene).set(sceneData).where(sql`${scene.id} = ${id}`);
}

export async function deleteScene(id: SelectScene['id']) {
  return await db.delete(scene).where(sql`${scene.id} = ${id}`);
}