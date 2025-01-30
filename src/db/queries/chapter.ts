import { chapter, SelectChapter, InsertChapter } from "../schema";
import db from "../index";
import { sql } from "drizzle-orm";

export async function getChapterById(id: SelectChapter["id"]) {
  return await db.select().from(chapter).where(sql`${chapter.id} = ${id}`);
}

export async function getChaptersByProjectId(projectId: SelectChapter["projectId"]) {
  return await db.select().from(chapter).where(sql`${chapter.projectId} = ${projectId}`);
}

export async function createChapter(chapterData: InsertChapter) {
  await db.insert(chapter).values(chapterData);
}

export async function updateChapter(id: string, chapterData: InsertChapter) {
  const _id = parseInt(id);
  return await db.update(chapter).set(chapterData).where(sql`${chapter.id} = ${_id}`);
}

export async function deleteChapter(id: string){
  const _id = parseInt(id);
  return await db.delete(chapter).where(sql`${chapter.id} = ${_id}`);
} 

