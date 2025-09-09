import 'dotenv/config';
import { sql } from 'drizzle-orm';
import { db } from './index';

// Environment check - only allow in dev/test
const allowedEnvs = ['development', 'test'];
if (!allowedEnvs.includes(process.env.NODE_ENV || 'development')) {
  console.error('❌ Database reset is only allowed in development or test environments');
  process.exit(1);
}

async function reset() {
  try {
    console.log('🔄 Resetting database...');

    // Truncate all tables to clear all data (including identity columns)
    console.log('🗑️  Truncating all tables...');
    await db.execute(sql`TRUNCATE TABLE instruments RESTART IDENTITY CASCADE`);

    // delete all users
    console.log('🗑️  Deleting all users...');
    await db.execute(sql`DELETE FROM auth.users`);

    console.log('✅ Database reset complete - all tables emptied');
    console.log('ℹ️  Run `pnpm db:seed` to populate with sample data');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database reset failed:', error);
    process.exit(1);
  }
}

reset();
