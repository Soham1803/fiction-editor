CREATE TABLE IF NOT EXISTS "synopsis" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_modified" timestamp NOT NULL,
	"project_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "world" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"project_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "synopsis" ADD CONSTRAINT "synopsis_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "world" ADD CONSTRAINT "world_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "project" DROP COLUMN IF EXISTS "synopsis";--> statement-breakpoint
ALTER TABLE "project" DROP COLUMN IF EXISTS "world";