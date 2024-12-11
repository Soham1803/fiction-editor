import { serial, text, timestamp, pgTable, integer, boolean, jsonb } from "drizzle-orm/pg-core";

export const user = pgTable('user', {
  // id, username, email, password, created_at, updated_at, last_login
  id: serial('id').primaryKey(),
  username: text('name').unique().notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().$onUpdate(()=>new Date()),
  last_login: timestamp('last_login').defaultNow(),
});

export type InsertUser = typeof user.$inferInsert;
export type SelectUser = typeof user.$inferSelect;

export const project = pgTable('project', {
  // id, title, description, created at, updated_at
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().$onUpdate(()=>new Date()),
  userId: integer('user_id')
          .notNull()
          .references(()=>user.id, {onDelete: 'cascade'}),
});

export type InsertProject = typeof project.$inferInsert;
export type SelectProject = typeof project.$inferSelect;

export const chapter = pgTable('chapter', {
  // id, title, content, created_at, last_modified, word_count
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content'),
  created_at: timestamp('created_at').notNull().defaultNow(),
  last_modified: timestamp('last_modified').notNull().$onUpdate(()=>new Date()),
  projectId: integer('project_id')
          .notNull()
          .references(()=>project.id, {onDelete: 'cascade'}),
});

export type InsertChapter = typeof chapter.$inferInsert;
export type SelectChapter = typeof chapter.$inferSelect;

export const version = pgTable('version', {
  id: serial('id').primaryKey(), // Unique identifier for each version
  version_number: integer('version_number').notNull(), // Sequential version number
  commit_hash: text('commit_hash').unique().notNull(), // Unique commit hash
  content_snapshot: jsonb('content_snapshot').$type<{ snapshot: string }>().notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  comment: text('comment'),
  created_by: integer('created_by').notNull()
            .references(() => user.id, { onDelete: 'cascade' }),
  projectId: integer('project_id').notNull()
              .references(() => project.id, { onDelete: 'cascade' }),
  chapterId: integer('chapter_id')
              .references(() => chapter.id, { onDelete: 'cascade'}),
});

export type InsertVersion = typeof version.$inferInsert;
export type SelectVersion = typeof version.$inferSelect;

export const userSettings = pgTable('user_settings', {
  // theme, font_size, notifications_enabled
  theme: text('theme').notNull(),
  font_size: integer('font_size').notNull(),
  notifications_enabled: boolean('notifications_enabled').notNull(),
  userId: integer('user_id')
          .notNull()
          .references(()=>user.id, {onDelete: 'cascade'}),
});

export type InsertUserSettings = typeof userSettings.$inferInsert;
export type SelectUserSettings = typeof userSettings.$inferSelect;


