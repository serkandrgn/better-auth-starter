import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com", // Add Google OAuth domains
      "avatars.githubusercontent.com", // Add GitHub OAuth domains
      // Add any other domains where your images might come from
    ],
  },
};

export default nextConfig;
