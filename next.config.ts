import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    /* next/image defaults to quality 75 and re-encodes to WebP. That is fine for
       photographs and visibly WRONG for UI screenshots: 75 puts ringing around
       high-contrast text and banding in flat fills, which is exactly what a
       product screenshot is made of. 90 is allowed here so components that
       render app captures can opt into it; 75 stays the default for photos. */
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        pathname: "/b/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
