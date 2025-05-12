import { pgTable, serial, text } from "drizzle-orm/pg-core";
// replace this drizzle schema with this table
// --Create the table
// create table instruments(
//     id bigint primary key generated always as identity,
//     name text not null
// );
// --Insert some sample data into the table
// insert into instruments(name)
// values
//     ('violin'),
//     ('viola'),
//     ('cello');
// alter table instruments enable row level security;
// AI!
export const notes = pgTable('notes', {
    id: serial('id').primaryKey(),
    title: text('title')
});
