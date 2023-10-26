/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:true,
}

module.exports = nextConfig

module.exports = {
  images: {
    loader: 'custom',
    loaderFile: './utils/supabase-image-loader.ts',
  },
}
