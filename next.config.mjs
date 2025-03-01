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
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  // Add these Vercel-specific configurations
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

// Функція для об'єднання конфігурацій
function mergeConfig(baseConfig, userConfig) {
  if (!userConfig) {
    return baseConfig;
  }

  const mergedConfig = { ...baseConfig };

  for (const key in userConfig) {
    if (
      typeof baseConfig[key] === 'object' &&
      !Array.isArray(baseConfig[key])
    ) {
      mergedConfig[key] = {
        ...baseConfig[key],
        ...userConfig[key],
      };
    } else {
      mergedConfig[key] = userConfig[key];
    }
  }

  return mergedConfig;
}

// Спроба імпортувати користувацьку конфігурацію
let userConfig;
try {
  userConfig = await import('./v0-user-next.config.mjs');
} catch (e) {
  // Ігноруємо помилку, якщо файл не існує
  userConfig = {};
}

// Об'єднуємо конфігурації
const finalConfig = mergeConfig(nextConfig, userConfig.default || userConfig);

// Застосовуємо next-intl до фінальної конфігурації
export default withNextIntl(finalConfig);

