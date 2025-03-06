#!/bin/bash

echo "Installing PM2 globally..."
npm install -g pm2

echo "Stopping any existing Node.js processes..."
pkill -f "node server.js" || true
pm2 delete all || true

echo "Starting server with PM2..."
NODE_ENV=production PORT=3000 pm2 start server.js --name "journeyua-houses"

echo "Setting up PM2 to start on system boot..."
pm2 startup
pm2 save

echo "PM2 status:"
pm2 status

echo "PM2 logs:"
pm2 logs --lines 20

