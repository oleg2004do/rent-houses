#!/bin/bash

echo "Stopping current Node.js process..."
pkill -f "node server.js" || true

echo "Cleaning project..."
rm -rf .next node_modules

echo "Installing dependencies..."
npm install

echo "Building project..."
npm run build

echo "Starting server..."
NODE_ENV=production PORT=3000 nohup node server.js > server.log 2>&1 &

echo "Server restarted with clean build!"
echo "Checking if server is running..."
sleep 5
if pgrep -f "node server.js" > /dev/null; then
  echo "✅ Server is running"
  ps aux | grep "node server.js" | grep -v grep
else
  echo "❌ Server is NOT running!"
  echo "Checking server logs for errors:"
  tail -n 50 server.log
fi

echo "Restarting Nginx..."
sudo systemctl restart nginx
echo "Nginx restarted!"

