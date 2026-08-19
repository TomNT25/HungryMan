import { execSync } from 'child_process';

// Extract arguments passed to this script
const args = process.argv.slice(2);

// Filter out Angular-specific '--configuration' and its value (e.g. 'production')
const cleanArgs = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--configuration') {
    i++; // Skip the next argument as well (e.g., 'production')
  } else if (args[i].startsWith('--configuration=')) {
    // Skip if passed as single option like --configuration=production
  } else {
    cleanArgs.push(args[i]);
  }
}

try {
  // Execute the Vite build command with the sanitized arguments
  execSync(`npx vite build ${cleanArgs.join(' ')}`, { stdio: 'inherit' });
} catch (error) {
  process.exit(1);
}
