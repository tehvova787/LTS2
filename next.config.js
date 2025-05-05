/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/metaverse',
        destination: '/metaverse/frontend/index.html',
      },
      {
        source: '/metaverse/:path*',
        destination: '/metaverse/frontend/:path*',
      },
    ]
  },
  // experimental: {
  //   appDir: true,
  // },
  images: {
    domains: [
      'images.unsplash.com'
    ]
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
      },
    });
    return config;
  },
}

module.exports = nextConfig 