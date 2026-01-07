#!/bin/bash
set -e

# Update and install Certbot
echo "Installing Certbot..."
apt-get update
apt-get install -y certbot python3-certbot-nginx

# Obtain SSL Certificate (Non-interactive)
echo "Obtaining SSL Certificate..."
# We use --nginx to automatically edit the config
# --redirect forcing HTTPS
# -d specifies the domains
certbot --nginx \
    --non-interactive \
    --agree-tos \
    -m admin@bkbcktechxpression.in \
    --redirect \
    -d bkbcktechxpression.in \
    -d www.bkbcktechxpression.in

echo "SSL Certificate installed successfully!"
echo "Auto-renewal is enabled by default with Certbot."
