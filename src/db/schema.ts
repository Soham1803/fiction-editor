import { serial, text, timestamp, pgTable, integer, boolean, jsonb, pgEnum } from "drizzle-orm/pg-core";

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

const projectType = pgEnum('project_type', ['novel', 'short_story', 'poem', 'script', 'other']);

export const project = pgTable('project', {
  // id, title, description, created at, updated_at
  id: serial('id').primaryKey(),
  type: projectType('type').default('novel'),
  title: text('title').notNull(),
  description: text('description'),
  genre: text('genre'),
  tone: text('tone'),
  point_of_view: text('point_of_view'),
  theme: text('theme'),
  color_scheme: text('color_scheme'),
   
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().$onUpdate(()=>new Date()),
  userId: integer('user_id')
          .notNull()
          .references(()=>user.id, {onDelete: 'cascade'}),
});


export type InsertProject = typeof project.$inferInsert;
export type SelectProject = typeof project.$inferSelect;

export const synopsis = pgTable('synopsis', {
  
  id: serial('id').primaryKey(),
  content: text('content'),
  created_at: timestamp('created_at').notNull().defaultNow(),
  last_modified: timestamp('last_modified').notNull().$onUpdate(()=>new Date()),
  projectId: integer('project_id')
          .notNull()
          .references(()=>project.id, {onDelete: 'cascade'}),
});

export type InsertSynopsis = typeof synopsis.$inferInsert;
export type SelectSynopsis = typeof synopsis.$inferSelect;

export const world = pgTable('world', {
  
  id: serial('id').primaryKey(),
  title: text('title').notNull(), // could be an ai generated name
  description: text('description'),
  projectId: integer('project_id')
          .notNull()
          .references(()=>project.id, {onDelete: 'cascade'}),
});

export type InsertWorld = typeof world.$inferInsert;
export type SelectWorld = typeof world.$inferSelect;

export const lore = pgTable('lore', {
  
  id: serial('id').primaryKey(),
  title: text('title').notNull(), // could be an ai generated name
  content: text('content'),
  created_at: timestamp('created_at').notNull().defaultNow(),
  last_modified: timestamp('last_modified').notNull().$onUpdate(()=>new Date()),
  projectId: integer('project_id')
          .notNull()
          .references(()=>project.id, {onDelete: 'cascade'}),
});

export type InsertLore = typeof lore.$inferInsert;
export type SelectLore = typeof lore.$inferSelect;

export const inspirations = pgTable('inspirations', {
  
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  insights: text('insights'),
  projectId: integer('project_id')
          .notNull()
          .references(()=>project.id, {onDelete: 'cascade'}),
});

export type InsertInspirations = typeof inspirations.$inferInsert;
export type SelectInspirations = typeof inspirations.$inferSelect;

export const emotions = pgTable('emotions', {
  
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  projectId: integer('project_id')
          .notNull()
          .references(()=>project.id, {onDelete: 'cascade'}),
});

export type InsertEmotions = typeof emotions.$inferInsert;
export type SelectEmotions = typeof emotions.$inferSelect;

export const beats = pgTable('beats', {
  
  id: serial('id').primaryKey(),
  sequence_no: integer('sequence_no').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  projectId: integer('project_id')
          .notNull()
          .references(()=>project.id, {onDelete: 'cascade'}),
});

export type InsertBeats = typeof beats.$inferInsert;
export type SelectBeats = typeof beats.$inferSelect;

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


