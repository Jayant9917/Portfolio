import { Redis } from '@upstash/redis';

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error(`
    Missing Upstash Redis environment variables.
    Please add the following to your .env.local file:
    
    UPSTASH_REDIS_REST_URL=your_rest_url_here
    UPSTASH_REDIS_REST_TOKEN=your_rest_token_here
  `);
}

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});