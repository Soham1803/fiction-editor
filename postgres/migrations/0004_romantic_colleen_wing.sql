CREATE TABLE IF NOT EXISTS "scene" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"content" text,
	"summary" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_modified" timestamp NOT NULL,
	"chapter_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scene" ADD CONSTRAINT "scene_chapter_id_chapter_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."chapter"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "chapter" DROP COLUMN IF EXISTS "content";