// next.config.mjs
var nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  webpack(config, { isServer }) {
    if (isServer && config.output) {
      config.output.chunkFilename = "[name].js";
    }
    return config;
  }
};
var next_config_default = nextConfig;
export {
  next_config_default as default
};
