const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },

  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      return [
        {
          source: '/api/:path*',
          destination: `${apiUrl}/api/:path*`,
        },
      ];
    }
    return [];
  },
};

module.exports = nextConfig;
