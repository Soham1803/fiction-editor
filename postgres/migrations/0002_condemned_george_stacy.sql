CREATE TABLE IF NOT EXISTS "beats" (
	"id" serial PRIMARY KEY NOT NULL,
	"sequence_no" integer NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"project_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "emotions" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"project_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inspirations" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"insights" text,
	"project_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lore" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_modified" timestamp NOT NULL,
	"project_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "type" "project_type" DEFAULT 'novel';--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "genre" text;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "tone" text;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "point_of_view" text;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "synopsis" text;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "theme" text;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "world" text;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "color_scheme" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "beats" ADD CONSTRAINT "beats_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "emotions" ADD CONSTRAINT "emotions_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inspirations" ADD CONSTRAINT "inspirations_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lore" ADD CONSTRAINT "lore_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
