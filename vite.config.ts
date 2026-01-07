import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Declare process manually for Node environment usage in config
declare const process: { 
  env: Record<string, string>; 
  cwd: () => string; 
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  // Robustly find the API Key:
  // 1. System Environment Variable (process.env.API_KEY)
  // 2. .env file variable (API_KEY)
  // 3. .env file VITE_ prefixed variable (VITE_API_KEY)
  const apiKey = process.env.API_KEY || env.API_KEY || env.VITE_API_KEY || '';

  if (!apiKey) {
    console.warn('\x1b[33m%s\x1b[0m', '⚠️  WARNING: API_KEY is missing! The Agent will not function correctly.');
  } else {
    console.log('\x1b[32m%s\x1b[0m', '✓ API_KEY loaded successfully.');
  }

  return {
    plugins: [react()],
    define: {
      // Stringify the API key to ensure it's treated as a string literal in the client code
      // This performs a text replacement: process.env.API_KEY -> "your_key_here"
      'process.env.API_KEY': JSON.stringify(apiKey),
    },
  };
});