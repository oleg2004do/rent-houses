#!/bin/bash

echo "Checking if Node.js server is running..."
if pgrep -f "node server.js" > /dev/null; then
  echo "✅ Server is running"
  ps aux | grep "node server.js" | grep -v grep
else
  echo "❌ Server is NOT running!"
fi

echo -e "\nChecking if port 3000 is in use:"
netstat -tuln | grep 3000 || echo "❌ Port 3000 is not in use"

echo -e "\nChecking server logs (last 20 lines):"
if [ -f "server.log" ]; then
  tail -n 20 server.log
else
  echo "❌ No server.log file found"
fi

