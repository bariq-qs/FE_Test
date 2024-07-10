/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@mui/x-charts'],
  redirects: async () => [
    { source: '/', destination: '/login', permanent: false, },
    { source: '/jm', destination: '/jm/dashboard', permanent: false },
  ],
};

export default nextConfig;
