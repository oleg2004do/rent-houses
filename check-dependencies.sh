#!/bin/bash

echo "Checking Node.js version:"
node -v

echo -e "\nChecking NPM version:"
npm -v

echo -e "\nChecking Next.js dependency:"
grep "next" package.json

echo -e "\nChecking for missing dependencies:"
npm ls

echo -e "\nChecking disk space:"
df -h

echo -e "\nChecking memory usage:"
free -m

echo -e "\nChecking CPU load:"
uptime

