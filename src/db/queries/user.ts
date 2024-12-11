import db from '../index';
import { 
  user, 
  InsertUser, 
  SelectUser, 
} from '../schema';
import { sql } from 'drizzle-orm'

export async function createUser(data: InsertUser) {
  await db.insert(user).values(data);
}

export async function getAllUsers(){
  return await db.select().from(user);
}

export async function getUserByEmail(email: SelectUser['email']) {
  return await db.select().from(user).where(sql`${user.email} = ${email}`);
}

export async function getUserByUsername(username: SelectUser['username']){
  return await db.select().from(user).where(sql`${user.username} = ${username}`);
}

export async function updateUser(id: string, data: InsertUser){
  const _id = parseInt(id);
  return await db.update(user).set(data).where(sql`${user.id} = ${_id}`);
}

export async function deleteUser(id: string){
  const _id = parseInt(id);

  return await db.delete(user).where(sql`${user.id} = ${_id}`);
}
