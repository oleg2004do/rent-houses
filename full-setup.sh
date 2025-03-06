#!/bin/bash

echo "Creating logs directory..."
mkdir -p logs

echo "Stopping any existing processes..."
pkill -f "node server.js" || true
pm2 delete all 2>/dev/null || true

echo "Installing dependencies..."
npm install

echo "Building the project..."
npm run build

echo "Installing PM2 globally if not installed..."
if ! command -v pm2 &> /dev/null; then
  npm install -g pm2
fi

echo "Starting server with PM2..."
pm2 start ecosystem.config.js

echo "Setting up PM2 to start on system boot..."
pm2 startup
pm2 save

echo "Restarting Nginx..."
sudo systemctl restart nginx

echo "PM2 status:"
pm2 status

echo "Testing connection to server:"
curl -I http://localhost:3000 || echo "❌ Could not connect to server"

echo "Setup complete! Your application should now be running."

