/** @type {import('next/dist/next-server/server/config-shared').NextConfig} */

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const config = {
  reactStrictMode: true,
  eslint: {
    dirs: ["src"],
  },
  webpack: (config, { isServer }) => {
    // @see https://github.com/vercel/next.js/issues/7755
    if (!isServer) {
      config.resolve.fallback.fs = false;
      // config.resolve.fallback.net = false;
      // config.resolve.fallback.tls = false;
      // config.resolve.fallback.child_process = false;
    }
    return config;
  },
};

module.exports = config;
