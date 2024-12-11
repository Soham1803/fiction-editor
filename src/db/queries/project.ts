import db from '../index';
import { project, InsertProject, SelectProject } from '../schema';
import { sql } from 'drizzle-orm';

export async function getProjectById(id: SelectProject['id']) {
  return await db.select().from(project).where(sql`${project.id} = ${id}`);
}

export async function createProject(projectData: InsertProject) {
  await db.insert(project).values(projectData);
}

export async function updateProject(id: string, projectData: InsertProject) {
  const _id = parseInt(id);
  return await db.update(project).set(projectData).where(sql`${project.id} = ${_id}`);
}

export async function deleteProject(id: string){
  const _id = parseInt(id);
  return await db.delete(project).where(sql`${project.id} = ${_id}`);
}
