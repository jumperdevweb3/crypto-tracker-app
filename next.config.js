/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["assets.coingecko.com", "app.1inch.io"],
  },
};

module.exports = nextConfig;
