/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' to allow API routes
  images: {
    unoptimized: true,
    formats: ['image/webp'],
  },
  trailingSlash: true,
  
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Enable SWC minification
  swcMinify: true,
  
  // Reduce bundle size
  poweredByHeader: false,
  
  // Compression
  compress: true,
  
  // Optimize production build
  reactStrictMode: true,
};

export default nextConfig;


