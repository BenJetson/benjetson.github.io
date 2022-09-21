/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // TODO this is where you add domains for next/image
    // TODO add flickr
    // domains: ["dummyimage.com"],
  },
};

module.exports = nextConfig;
