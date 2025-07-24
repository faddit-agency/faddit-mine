/** @type {import('next').NextConfig} */
const nextConfig = {
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
}

module.exports = nextConfig 