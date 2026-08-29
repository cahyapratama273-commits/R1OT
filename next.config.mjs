/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's.wordpress.com',
        pathname: '/mshots/v1/**',
      },
    ],
  },
};

export default nextConfig;
