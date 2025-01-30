import db from '../index';
import { entity_mentions, InsertEntityMentions, SelectEntityMentions } from '../schema';
import { sql } from 'drizzle-orm';

export async function getEntityMentionById(id: SelectEntityMentions['id']) {
  return await db.select().from(entity_mentions).where(sql`${entity_mentions.id} = ${id}`);
}

export async function getEntityMentionsByEntityId(entityId: SelectEntityMentions['entityId']) {
  return await db.select().from(entity_mentions).where(sql`${entity_mentions.entityId} = ${entityId}`);
}

export async function createEntityMention(entityMentionData: InsertEntityMentions) {
  await db.insert(entity_mentions).values(entityMentionData);
}

export async function updateEntityMention(id: string, entityMentionData: InsertEntityMentions) {
  const _id = parseInt(id);
  return await db.update(entity_mentions).set(entityMentionData).where(sql`${entity_mentions.id} = ${_id}`);
}