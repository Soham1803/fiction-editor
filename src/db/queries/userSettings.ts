import { userSettings, SelectUserSettings, InsertUserSettings } from '../schema';
import { sql } from 'drizzle-orm';
import db from '../index';

export async function createUserSettings(userSettingsData: InsertUserSettings) {
  await db.insert(userSettings).values(userSettingsData);
}

export async function getUserSettingsByUserId(userId: SelectUserSettings['userId']) {
  return await db.select().from(userSettings).where(sql`${userSettings.userId} = ${userId}`);
}

export async function updateUserSettings(userId: number, userSettingsData: {
  theme: InsertUserSettings['theme'],
  font_size: InsertUserSettings['font_size'],
  notifications_enabled: InsertUserSettings['notifications_enabled']
}) {
  const _userId = Math.floor(userId);
  return await db.update(userSettings).set(userSettingsData).where(sql`${userSettings.userId} = ${_userId}`);
}

export async function deleteUserSettings(userId: number) {
  const _userId = Math.floor(userId);
  return await db.delete(userSettings).where(sql`${userSettings.userId} = ${_userId}`);
}
