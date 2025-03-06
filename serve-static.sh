#!/bin/bash

echo "Installing serve package..."
npm install -g serve

echo "Stopping any existing processes..."
pkill -f "serve -s out" || true
pm2 delete all 2>/dev/null || true

echo "Building the project as static export..."
npm run build

echo "Starting static file server..."
pm2 start serve -- -s out -l 3000

echo "Setting up PM2 to start on system boot..."
pm2 startup
pm2 save

echo "PM2 status:"
pm2 status

echo "Testing connection to server:"
curl -I http://localhost:3000 || echo "❌ Could not connect to server"

echo "Setup complete! Your static site should now be running."

