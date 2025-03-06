#!/bin/bash

echo "Checking if server is running..."
if pgrep -f "node server.js" > /dev/null; then
  echo "Server is running!"
  echo "Process info:"
  ps aux | grep "node server.js" | grep -v grep
else
  echo "Server is NOT running!"
fi

echo ""
echo "Checking server logs (last 20 lines):"
tail -n 20 server.log

echo ""
echo "Checking nginx status:"
sudo systemctl status nginx | head -n 10

echo ""
echo "Testing connection to server:"
curl -I http://localhost:3000

