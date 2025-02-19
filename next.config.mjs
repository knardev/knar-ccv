/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oguzdjlnwsdproeuoywm.supabase.co",
      },
      {
        protocol: "https",
        hostname: "google.com",
      },
    ],
  },
};

export default nextConfig;
