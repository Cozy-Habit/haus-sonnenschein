/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },

  webpack(config) {
    headers: ([
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable", // cache for 1 year
      },
    ],
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/, // Apply only for JavaScript/TypeScript
        use: ["@svgr/webpack"], // Use SVGR for these files
      }));

    // Add rule for SVGs used as static assets (e.g., for background images)
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.(css|sass|scss)$/i, // Apply only for CSS/SASS files
      type: "asset", // Emit them as files
    });
    return config;
  },
};

export default nextConfig;
