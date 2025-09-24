// This script patches the Supabase client to use localhost for development
const fs = require('fs');
const path = require('path');

const clientPath = path.join(__dirname, 'src', 'integrations', 'supabase', 'client.ts');

// Read the current client file
let clientContent = fs.readFileSync(clientPath, 'utf8');

// Replace the Supabase URL with localhost
clientContent = clientContent.replace(
  'const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;',
  'const SUPABASE_URL = "http://127.0.0.1:54321";'
);

// Replace the anon key with the default local key
clientContent = clientContent.replace(
  'const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;',
  'const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";'
);

// Write the patched content back
fs.writeFileSync(clientPath, clientContent);

console.log('Supabase client patched for local development');