import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wikia.nocookie.net',
        pathname: '/valorant/**', // aceita imagens dentro de /valorant/
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '**',
      }
    ],
  },
};

export default withNextIntl(nextConfig);
