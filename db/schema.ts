import { sql } from 'drizzle-orm';
import { pgTable, pgPolicy } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { anonRole } from 'drizzle-orm/supabase';

export const instruments = pgTable(
    'instruments',
    {
        id: t.integer('id').primaryKey().generatedAlwaysAsIdentity(),
        name: t.text('name').notNull()
    },
    (table) => [
        // Enable row level security policy for public read access
        pgPolicy('public can read instruments', {
            for: 'select',
            to: anonRole,
            using: sql`true`
        })
    ]
);
