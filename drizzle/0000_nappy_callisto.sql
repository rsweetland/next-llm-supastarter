CREATE TABLE "instruments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "instruments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "instruments" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "public can read instruments" ON "instruments" AS PERMISSIVE FOR SELECT TO "anon" USING (true);
