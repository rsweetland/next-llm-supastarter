# LLM Conventions
Use these conventions on this project. Edit them when versions are upgraded or conventions change.

## Drizzle Version 0.43.1 (current version on this project)

### Example Schemas
From: https://orm.drizzle.team/docs/sql-schema-declaration

import { AnyPgColumn } from "drizzle-orm/pg-core";
import { pgEnum, pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
export const rolesEnum = pgEnum("roles", ["guest", "user", "admin"]);
export const users = table(
  "users",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    firstName: t.varchar("first_name", { length: 256 }),
    lastName: t.varchar("last_name", { length: 256 }),
    email: t.varchar().notNull(),
    invitee: t.integer().references((): AnyPgColumn => users.id),
    role: rolesEnum().default("guest"),
  },
  (table) => [
    t.uniqueIndex("email_idx").on(table.email)
  ]
);
export const posts = table(
  "posts",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    slug: t.varchar().$default(() => generateUniqueString(16)),
    title: t.varchar({ length: 256 }),
    ownerId: t.integer("owner_id").references(() => users.id),
  },
  (table) => [
    t.uniqueIndex("slug_idx").on(table.slug),
    t.index("title_idx").on(table.title),
  ]
);
export const comments = table("comments", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  text: t.varchar({ length: 256 }),
  postId: t.integer("post_id").references(() => posts.id),
  ownerId: t.integer("owner_id").references(() => users.id),
});


## Row Level Security (RLS)
From: https://orm.drizzle.team/docs/rls


Example of pgPolicy with all available properties

```typescript
import { sql } from 'drizzle-orm';
import { integer, pgPolicy, pgRole, pgTable } from 'drizzle-orm/pg-core';
export const admin = pgRole('admin');
export const users = pgTable('users', {
	id: integer(),
}, (t) => [
	pgPolicy('policy', {
		as: 'permissive',
		to: admin,
		for: 'delete',
		using: sql``,
		withCheck: sql``,
	}),
]);
```

### Policy options

as	Possible values are permissive or restrictive
to	Specifies the role to which the policy applies. Possible values include public, current_role, current_user, session_user, or any other role name as a string. You can also reference a pgRole object.
for	Defines the commands this policy will be applied to. Possible values are all, select, insert, update, delete.
using	The SQL statement that will be applied to the USING part of the policy creation statement.
withCheck	An SQL statement that will be applied to the WITH CHECK part of the policy creation statement.
Link Policy to an existing table

There are situations where you need to link a policy to an existing table in your database. The most common use case is with database providers like Neon or Supabase, where you need to add a policy to their existing tables. In this case, you can use the .link() API

```typescript
import { sql } from "drizzle-orm";
import { pgPolicy } from "drizzle-orm/pg-core";
import { authenticatedRole, realtimeMessages } from "drizzle-orm/supabase";
export const policy = pgPolicy("authenticated role insert policy", {
  for: "insert",
  to: authenticatedRole,
  using: sql``,
}).link(realtimeMessages);
```

## Using Drizzle with Supabase
From: https://orm.drizzle.team/docs/rls#using-with-supabase

We also have a /supabase import with a set of predefined roles marked as existing, which you can use in your schema. This import will be extended in a future release with more functions and helpers to make using RLS and Supabase simpler.

```typescript
// drizzle-orm/supabase
export const anonRole = pgRole('anon').existing();
export const authenticatedRole = pgRole('authenticated').existing();
export const serviceRole = pgRole('service_role').existing();
export const postgresRole = pgRole('postgres_role').existing();
export const supabaseAuthAdminRole = pgRole('supabase_auth_admin').existing();
```

For example, you can use the Supabase predefined roles like this:

```typescript
import { sql } from 'drizzle-orm';
import { serviceRole } from 'drizzle-orm/supabase';
import { integer, pgPolicy, pgRole, pgTable } from 'drizzle-orm/pg-core';
export const admin = pgRole('admin');
export const users = pgTable('users', {
	id: integer(),
}, (t) => [
	pgPolicy(`policy-insert`, {
		for: 'insert',
		to: serviceRole,
		withCheck: sql`false`,
	}),
]);
```

The /supabase import also includes predefined tables and functions that you can use in your application

```typescript
// drizzle-orm/supabase
const auth = pgSchema('auth');
export const authUsers = auth.table('users', {
	id: uuid().primaryKey().notNull(),
});
const realtime = pgSchema('realtime');
export const realtimeMessages = realtime.table(
	'messages',
	{
		id: bigserial({ mode: 'bigint' }).primaryKey(),
		topic: text().notNull(),
		extension: text({
			enum: ['presence', 'broadcast', 'postgres_changes'],
		}).notNull(),
	},
);
export const authUid = sql`(select auth.uid())`;
export const realtimeTopic = sql`realtime.topic()`;
```

This allows you to use it in your code, and Drizzle Kit will treat them as existing databases, using them only as information to connect to other entities

```typescript
import { foreignKey, pgPolicy, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql";
import { authenticatedRole, authUsers } from "drizzle-orm/supabase";
export const profiles = pgTable(
  "profiles",
  {
    id: uuid().primaryKey().notNull(),
    email: text().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.id],
	  // reference to the auth table from Supabase
      foreignColumns: [authUsers.id],
      name: "profiles_id_fk",
    }).onDelete("cascade"),
    pgPolicy("authenticated can view all profiles", {
      for: "select",
	  // using predefined role from Supabase
      to: authenticatedRole,
      using: sql`true`,
    }),
  ]
);
```

Let’s check an example of adding a policy to a table that exists in Supabase

```typescript
import { sql } from "drizzle-orm";
import { pgPolicy } from "drizzle-orm/pg-core";
import { authenticatedRole, realtimeMessages } from "drizzle-orm/supabase";
export const policy = pgPolicy("authenticated role insert policy", {
  for: "insert",
  to: authenticatedRole,
  using: sql``,
}).link(realtimeMessages);
```
