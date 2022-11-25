/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["assets.coingecko.com"],
  },
};

module.exports = nextConfig;
