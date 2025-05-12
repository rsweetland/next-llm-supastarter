import { pgTable, bigserial, text } from "drizzle-orm/pg-core";

export const instruments = pgTable('instruments', {
    id: bigserial('id', { mode: 'identity' }).primaryKey(),
    name: text('name').notNull()
});
