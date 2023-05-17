/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    CONNECTION_STRING: "ENTER YOUR NEON CONNECTION STRING HERE",
    PROJECT_ID: 'ENTER YOUR ZERO DEV PROJECT ID HERE'
  }
}

module.exports = nextConfig
