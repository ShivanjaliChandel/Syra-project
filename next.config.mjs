/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_VTEX_ACCOUNT: process.env.NEXT_PUBLIC_VTEX_ACCOUNT,
    NEXT_PUBLIC_VTEX_ENVIRONMENT: process.env.NEXT_PUBLIC_VTEX_ENVIRONMENT,
  },
}

export default nextConfig
