CREATE TYPE "public"."context_type" AS ENUM('manuscript', 'scene_summary', 'relations', 'chat');--> statement-breakpoint
CREATE TYPE "public"."entity_type" AS ENUM('character', 'location', 'object', 'lore', 'subplot', 'other');--> statement-breakpoint
CREATE TYPE "public"."project_type" AS ENUM('novel', 'short_story', 'poem', 'script', 'other');--> statement-breakpoint

ALTER TABLE "project" ADD COLUMN "type" "public"."project_type" NOT NULL DEFAULT 'novel';--> statement-breakpoint
ALTER TABLE "entity" ADD COLUMN "type" "public"."entity_type" NOT NULL DEFAULT 'character';--> statement-breakpoint
ALTER TABLE "entity_mentions" ADD COLUMN "context_type" "public"."context_type" NOT NULL DEFAULT 'manuscript';--> statement-breakpoint

