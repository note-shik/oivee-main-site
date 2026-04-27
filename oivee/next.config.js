/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // No remote patterns — all images are local in /public.
    // Add a remotePatterns entry here if you ever load from a CDN/CMS.
    remotePatterns: [],
  },
}

module.exports = nextConfig
