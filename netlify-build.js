/**
 * Netlify build pre-processing script
 * This script ensures that tRPC modules and other dependencies are properly resolved during Netlify build
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

console.log('🚀 Starting Netlify build pre-processing...');

// Get the current directory using ES modules pattern
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure all dependencies are installed completely
console.log('📦 Checking dependencies...');
execSync('npm install --prefer-offline --no-audit', { stdio: 'inherit' });

// Check if key dependencies exist
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const requiredDeps = ['@trpc/client', '@trpc/server', '@trpc/react-query'];
const missingDeps = [];

for (const dep of requiredDeps) {
  if (!packageJson.dependencies[dep]) {
    missingDeps.push(dep);
  }
}

if (missingDeps.length > 0) {
  console.log(`❌ Missing key dependencies: ${missingDeps.join(', ')}`);
  console.log('🔄 Installing missing dependencies...');
  execSync(`npm install ${missingDeps.join(' ')}`, { stdio: 'inherit' });
} else {
  console.log('✅ All key dependencies are installed');
}

// Update the build script in package.json
if (!packageJson.scripts.prebuild) {
  packageJson.scripts.prebuild = 'node netlify-build.js';
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Added prebuild script to package.json');
}

console.log('🎉 Netlify build pre-processing completed!'); 