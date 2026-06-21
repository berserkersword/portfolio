/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "ik.imagekit.io" },
      { hostname: "images.unsplash.com" },
      { hostname: "img.icons8.com" },
    ],
  },
};

export default nextConfig;