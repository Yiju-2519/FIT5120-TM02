/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false, // Prevent 'fs' error, only fallback, should not rely on fs
    };
    return config;
  },
  // Add configuration for Turbopack
  experimental: {
    turbo: {
      resolveAlias: {
        '@trpc/client': '@trpc/client',
        '@trpc/server': '@trpc/server',
        '@trpc/react-query': '@trpc/react-query',
      },
    },
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default config;