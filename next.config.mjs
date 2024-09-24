/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true, // Error if linking to route that doesn't exist
  },
};

export default nextConfig;
