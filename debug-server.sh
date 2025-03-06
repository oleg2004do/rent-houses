#!/bin/bash

echo "Stopping any existing Node.js processes..."
pkill -f "node server.js" || true

echo "Starting server in foreground mode for debugging..."
echo "Press Ctrl+C to stop the server when done debugging."
NODE_ENV=production PORT=3000 node server.js

