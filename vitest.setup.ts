// Load environment variables from .env for Vitest
import '@testing-library/jest-dom';
import { config } from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';


// Check if .env.test exists
const testEnvPath = resolve(process.cwd(), '.env.test');
if (!existsSync(testEnvPath)) {
    throw new Error('.env.test required for running tests. Create it from .env.test.example');
}

// Load .env.test instead of .env
config({ path: testEnvPath });
console.log('Loaded test environment variables from .env.test');
