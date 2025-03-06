#!/bin/bash

echo "Checking if Node.js server is running..."
if pgrep -f "node server.js" > /dev/null; then
  echo "✅ Server is running"
  ps aux | grep "node server.js" | grep -v grep
else
  echo "❌ Server is NOT running!"
fi

echo -e "\nChecking server logs (last 20 lines):"
tail -n 20 server.log || echo "❌ No server.log file found"

echo -e "\nChecking Nginx configuration:"
sudo nginx -t || echo "❌ Nginx configuration test failed"

echo -e "\nChecking Nginx status:"
sudo systemctl status nginx | head -n 10 || echo "❌ Could not get Nginx status"

echo -e "\nChecking if port 3000 is in use:"
netstat -tuln | grep 3000 || echo "❌ Port 3000 is not in use"

echo -e "\nTrying to connect to localhost:3000:"
curl -I http://localhost:3000 || echo "❌ Could not connect to localhost:3000"

