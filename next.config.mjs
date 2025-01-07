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
      // {
      //   protocol: "http",
      //   hostname: "**",
      // },
    ],
  },
};

export default nextConfig;
