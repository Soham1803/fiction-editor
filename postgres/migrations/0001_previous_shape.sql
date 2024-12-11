ALTER TABLE "version" ADD COLUMN "chapter_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "version" ADD CONSTRAINT "version_chapter_id_chapter_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."chapter"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
