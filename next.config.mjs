/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    path: "/_next/image",
    loader: "default",
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
  },
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    BASE_URL_PROD: process.env.NEXT_PUBLIC_BASE_URL_PROD,
    AWS_BASE_URL: process.env.AWS_BASE_URL,
    AWS_BASE_URL_PROD: process.env.AWS_BASE_URL_PROD,
    AWS_CDN: process.env.AWS_CDN_URL,
    GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_CRYPTO_KEY: process.env.NEXT_CRYPTO_KEY,
    REDIS_URL: process.env.REDIS_URL,
    LOCAL_STORAGE_BASE_URL_DEV: process.env.LOCAL_STORAGE_BASE_URL_DEV,
    LOCAL_STORAGE_BASE_URL_PROD: process.env.LOCAL_STORAGE_BASE_URL_PROD,
  },
};

export default nextConfig;