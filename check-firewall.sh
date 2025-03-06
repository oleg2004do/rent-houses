#!/bin/bash

echo "Checking firewall status:"
sudo ufw status || echo "UFW not installed or not running"

echo -e "\nChecking if ports 80, 443, and 3000 are allowed:"
sudo ufw status | grep '80\|443\|3000' || echo "No specific rules for these ports found"

echo -e "\nEnsuring ports are open (if UFW is active):"
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3000/tcp

echo -e "\nUpdated firewall status:"
sudo ufw status

