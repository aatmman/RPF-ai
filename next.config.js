/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Exclude other project directories from compilation
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules',
        '**/rfp-ai-frontend-main/**',
        '**/rfp-ai-frontend-main with new home and setting/**',
      ],
    };
    return config;
  },
}

module.exports = nextConfig







