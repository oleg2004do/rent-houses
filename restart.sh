#!/bin/bash

# Зупиняємо поточний процес
echo "Stopping current Node.js process..."
pkill -f "node server.js" || true

# Очищаємо кеш
echo "Cleaning cache..."
rm -rf .next/cache

# Перезапускаємо сервер
echo "Starting server..."
NODE_ENV=production nohup node server.js > server.log 2>&1 &

echo "Server restarted!"

