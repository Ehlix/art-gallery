/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    loader: 'custom',
    loaderFile: './utils/supabase-image-loader.ts',
  },
};

module.exports = nextConfig;
