import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { db } from './index';
import { instruments } from './schema';

// Environment check - only allow in dev/test
const allowedEnvs = ['development', 'test'];
if (!allowedEnvs.includes(process.env.NODE_ENV || 'development')) {
  console.error('❌ Seeding is only allowed in development or test environments');
  process.exit(1);
}

async function seed() {
  try {
    console.log('🌱 Starting database seed...');

    // Create Supabase admin client for user creation
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.warn('⚠️  Missing Supabase credentials - skipping test user creation');
    }

    // Clear existing instruments data
    console.log('🗑️  Clearing existing instruments...');
    await db.delete(instruments);

    // Insert instrument seed data (from tutorial)
    console.log('🎵 Inserting instruments...');
    const instrumentsData = [
      { name: 'violin' },
      { name: 'viola' },
      { name: 'cello' }
    ];

    await db.insert(instruments).values(instrumentsData);
    console.log(`✅ Inserted ${instrumentsData.length} instruments`);

    // Create test user if credentials are available
    if (supabaseUrl && supabaseServiceKey) {
      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

      console.log('👤 Creating test user...');
      const { error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: 'test@test.com',
        password: 'test',
        email_confirm: true
      });

      if (authError) {
        // User might already exist
        if (authError.message.includes('already been registered')) {
          console.log('ℹ️  Test user already exists');
        } else {
          throw authError;
        }
      } else {
        console.log('✅ Created test user: test@test.com (password: test)');
      }
    }

    console.log('🎉 Database seeded successfully! \n \n Run `pnpm dev` and login with test@test.com / password: test');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
