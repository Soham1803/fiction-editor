import db from '../index';
import { project, InsertProject, SelectProject } from '../schema';
import { sql } from 'drizzle-orm';

export async function getProjectById(id: SelectProject['id']) {
  return await db.select().from(project).where(sql`${project.id} = ${id}`);
}

export async function getProjectsByUserId(userId: SelectProject['userId']) {
  return await db.select().from(project).where(sql`${project.userId} = ${userId}`);
}

export async function createProject(projectData: InsertProject) {
  await db.insert(project).values(projectData);
}

export async function updateProject(id: SelectProject['id'], projectData: InsertProject) {
  return await db.update(project).set(projectData).where(sql`${project.id} = ${id}`);
}

export async function deleteProject(id: SelectProject['id']) {
  return await db.delete(project).where(sql`${project.id} = ${id}`);
}
