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
  // Вимикаємо експериментальні функції, які можуть викликати проблеми
  experimental: {
    // webpackBuildWorker: true,
    // parallelServerBuildTraces: true,
    // parallelServerCompiles: true,
  },
  // Налаштування для динамічного рендерингу
  staticPageGenerationTimeout: 1000,
  // Вимикаємо строгий режим для запобігання помилок
  reactStrictMode: false,
};

export default withNextIntl(nextConfig);

