import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Declare process manually to avoid "Cannot find name 'process'" error (TS2580)
// This file is used in Node.js, but the project is configured for Browser (DOM).
declare const process: { 
  env: Record<string, string>; 
  cwd: () => string; 
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Stringify the API key to ensure it's treated as a string literal in the code
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY || ''),
    },
  };
});