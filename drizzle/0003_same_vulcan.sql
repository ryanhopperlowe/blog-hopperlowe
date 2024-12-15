ALTER TABLE "articles" ALTER COLUMN "location" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_location_unique" UNIQUE("location");