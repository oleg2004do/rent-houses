#!/bin/bash

echo "Checking if 'out' directory exists (for static export)..."
if [ -d "out" ]; then
  echo "✅ 'out' directory exists"
  echo "Files in 'out' directory:"
  ls -la out
else
  echo "❌ 'out' directory does not exist"
fi

echo -e "\nChecking if '.next' directory exists (for dynamic server)..."
if [ -d ".next" ]; then
  echo "✅ '.next' directory exists"
  echo "Files in '.next' directory:"
  ls -la .next
else
  echo "❌ '.next' directory does not exist"
fi

echo -e "\nChecking next.config.mjs for 'output: export' setting..."
grep -n "output.*export" next.config.mjs || echo "✅ 'output: export' not found in next.config.mjs"

