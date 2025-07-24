/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'images.clerk.dev',
      'img.clerk.com',
      'files.stripe.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'supabase.co'
    ],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig 