/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false, // 防止 'fs' 錯誤，僅做 fallback，不應真正依賴 fs
    };
    return config;
  },
};

export default config;