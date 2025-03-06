import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Вимикаємо експериментальні функції
  experimental: {},
  // Вимикаємо строгий режим
  reactStrictMode: false,
};

export default withNextIntl(nextConfig);

