#!/bin/bash

echo "Stopping current Node.js process..."
pkill -f "node server.js" || true

echo "Cleaning Next.js cache..."
rm -rf .next/cache

echo "Removing old build..."
rm -rf .next

echo "Building project..."
npm run build

echo "Starting server..."
NODE_ENV=production PORT=3000 nohup node server.js > server.log 2>&1 &

echo "Server restarted with clean build!"
echo "Check logs with: tail -f server.log"

