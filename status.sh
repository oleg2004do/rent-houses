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
echo "Checking server logs (last 10 lines):"
tail -n 10 server.log

