// Simple environment variables export
// Temporary solution to work around ESM/zod import issues

export const env = {
  // Server variables
  DATABASE_URL: process.env.DATABASE_URL || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  HIBP_API_KEY: process.env.HIBP_API_KEY || '9b943109e49542d59147c95d9d73a945',
  
  // Client variables
  NEXT_PUBLIC_DEPLOYED_ENV: process.env.NEXT_PUBLIC_DEPLOYED_ENV || ''
};
