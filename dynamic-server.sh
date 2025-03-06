#!/bin/bash

echo "Updating next.config.mjs to use dynamic server..."
cat > next.config.mjs << 'EOL'
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
  // Використовуємо динамічний сервер замість статичного експорту
  // output: 'export',
};

export default nextConfig;
EOL

echo "Stopping any existing processes..."
pkill -f "node" || true
pm2 delete all 2>/dev/null || true

echo "Installing dependencies..."
npm install

echo "Building the project for dynamic server..."
npm run build

echo "Starting Next.js server with PM2..."
pm2 start npm --name "journeyua-houses" -- start

echo "Setting up PM2 to start on system boot..."
pm2 startup
pm2 save

echo "PM2 status:"
pm2 status

echo "Testing connection to server:"
curl -I http://localhost:3000 || echo "❌ Could not connect to server"

echo "Setup complete! Your dynamic Next.js server should now be running."

