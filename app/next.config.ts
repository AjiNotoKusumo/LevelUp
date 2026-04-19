import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn2.unrealengine.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "cdn1.epicgames.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "media-cdn.epicgames.com",
        pathname: "**"
      }
    ]
  }
};

export default nextConfig;
