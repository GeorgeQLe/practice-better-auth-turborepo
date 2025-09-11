/**
 * Next.js Configuration for Monorepo Apps
 * 
 * This config does three main things:
 * 1. Environment Variable Loading: Manually reads and parses environment variables 
 *    from a root-level .env.local file (../../.env.local) so both apps can share 
 *    the same auth credentials from a single file at the monorepo root
 * 2. Package Transpilation: Transpiles workspace packages (@workspace/*) since 
 *    they're written in TypeScript and need compilation for the browser
 * 3. Content Security Policy: Sets CSP headers to whitelist Google OAuth domains
 *    and APIs needed for authentication to work properly
 */

import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

// Get the directory of this config file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from root .env.local and set them manually
try {
  const envPath = resolve(__dirname, '../../.env.local');
  const envFile = readFileSync(envPath, 'utf8');
  const lines = envFile.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        let value = valueParts.join('=');
        // Remove inline comments (everything after # including the #)
        const commentIndex = value.indexOf('#');
        if (commentIndex !== -1) {
          value = value.substring(0, commentIndex).trim();
        }
        process.env[key] = value;
      }
    }
  }
  // Successfully loaded environment variables from root .env.local
} catch (error) {
  console.warn('⚠️ Could not load root .env.local file:', error.message);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/auth", "@workspace/trpc", "@workspace/db"],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com https://apis.google.com",
              "style-src 'self' 'unsafe-inline' https://accounts.google.com",
              "img-src 'self' data: https://*.googleusercontent.com https://accounts.google.com",
              "connect-src 'self' https://accounts.google.com https://play.google.com https://apis.google.com",
              "frame-src 'self' https://accounts.google.com",
              "font-src 'self' data:"
            ].join('; ')
          }
        ]
      }
    ]
  }
}

export default nextConfig