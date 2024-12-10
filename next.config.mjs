/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        /** add local host*/
        protocol: "http",
        hostname: "localhost"
      }
    ],
    domains: [
      "images.unsplash.com",
      process.env.NEXT_PUBLIC_BASE_URL, 
    ].filter(Boolean),
  },
};

export default nextConfig;
