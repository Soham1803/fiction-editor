import db from '../index';
import { emotions, InsertEmotions, SelectEmotions } from '../schema';
import { sql } from 'drizzle-orm';

export async function getEmotionById(id: SelectEmotions['id']) {
  return await db.select().from(emotions).where(sql`${emotions.id} = ${id}`);
}

export async function getEmotionsByProjectId(projectId: SelectEmotions['projectId']) {
    return await db.select().from(emotions).where(sql`${emotions.projectId} = ${projectId}`);
}

export async function createEmotion(emotionData: InsertEmotions) {
  await db.insert(emotions).values(emotionData);
}

export async function updateEmotion(id: string, emotionData: InsertEmotions) {
  const _id = parseInt(id);
  return await db.update(emotions).set(emotionData).where(sql`${emotions.id} = ${_id}`);
}

export async function deleteEmotion(id: string){
  const _id = parseInt(id);
  return await db.delete(emotions).where(sql`${emotions.id} = ${_id}`);
}