#!/bin/bash

echo "Checking if port 3000 is in use:"
sudo lsof -i :3000 || echo "Port 3000 is not in use"

echo -e "\nChecking if port 80 is in use:"
sudo lsof -i :80 || echo "Port 80 is not in use"

echo -e "\nChecking if port 443 is in use:"
sudo lsof -i :443 || echo "Port 443 is not in use"

echo -e "\nChecking all listening ports:"
sudo netstat -tulpn | grep LISTEN

