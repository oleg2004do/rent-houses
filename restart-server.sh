#!/bin/bash

echo "Stopping current Node.js process..."
pkill -f "node server.js" || true

echo "Cleaning Next.js cache..."
rm -rf .next/cache

echo "Starting server..."
NODE_ENV=production PORT=3000 nohup node server.js > server.log 2>&1 &

echo "Server restarted!"
echo "Checking if server is running..."
sleep 3
if pgrep -f "node server.js" > /dev/null; then
  echo "✅ Server is running"
  ps aux | grep "node server.js" | grep -v grep
else
  echo "❌ Server is NOT running!"
  echo "Checking server logs for errors:"
  tail -n 20 server.log
fi

