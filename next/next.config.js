/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // TODO this is where you add domains for next/image
    // TODO add flickr
    // domains: ["dummyimage.com"],
  },
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
};

module.exports = nextConfig;
