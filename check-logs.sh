#!/bin/bash

# Перевіряємо логи Next.js
echo "=== Next.js Server Logs ==="
tail -n 50 server.log

# Перевіряємо логи Nginx
echo ""
echo "=== Nginx Error Logs ==="
sudo tail -n 50 /var/log/nginx/error.log

echo ""
echo "=== Nginx Access Logs ==="
sudo tail -n 20 /var/log/nginx/access.log

