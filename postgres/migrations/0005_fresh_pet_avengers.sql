CREATE TABLE IF NOT EXISTS "entity" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "entity_type" NOT NULL,
	"name" text NOT NULL,
	"aliases" text,
	"description" text,
	"entity_image" text,
	"inspirations" text,
	"project_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "entity_mentions" (
	"id" serial PRIMARY KEY NOT NULL,
	"context_type" "context_type" NOT NULL,
	"location" jsonb,
	"entity_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_settings" ADD COLUMN "font_family" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "entity" ADD CONSTRAINT "entity_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "entity_mentions" ADD CONSTRAINT "entity_mentions_entity_id_entity_id_fk" FOREIGN KEY ("entity_id") REFERENCES "public"."entity"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
