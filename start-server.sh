#!/bin/bash

echo "Stopping any existing Node.js processes..."
pkill -f "node server.js" || true

echo "Cleaning Next.js cache..."
rm -rf .next/cache

echo "Starting server with detailed logging..."
NODE_ENV=production PORT=3000 node server.js > server.log 2>&1 &

echo "Waiting for server to start..."
sleep 5

echo "Checking if server is running..."
if pgrep -f "node server.js" > /dev/null; then
  echo "✅ Server is running"
  ps aux | grep "node server.js" | grep -v grep
  
  echo -e "\nChecking if port 3000 is in use:"
  netstat -tuln | grep 3000 || echo "❌ Port 3000 is not in use"
  
  echo -e "\nTrying to connect to server:"
  curl -I http://localhost:3000 || echo "❌ Could not connect to server"
else
  echo "❌ Server is NOT running!"
  echo "Checking server logs for errors:"
  tail -n 50 server.log
fi

