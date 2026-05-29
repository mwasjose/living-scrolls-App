const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack(config, { isServer }) {
    if (isServer && config.output) {
      config.output.chunkFilename = '[name].js';
    }
    return config;
  },
};

export default nextConfig;
