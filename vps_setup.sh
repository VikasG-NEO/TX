#!/bin/bash
set -e

# Install Dependencies
apt-get update
apt-get install -y nginx certbot python3-certbot-nginx

# Setup Frontend Files
echo "Moving frontend files..."
mkdir -p /var/www/techsidedown
# Clean old files
rm -rf /var/www/techsidedown/*
cp -r /root/frontend/dist/* /var/www/techsidedown/

# Configure Nginx
echo "Configuring Nginx..."
cat > /etc/nginx/sites-available/default <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name bkbcktechxpression.in www.bkbcktechxpression.in;

    root /var/www/techsidedown;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Reload Nginx
nginx -t
systemctl reload nginx

# SSL Setup
echo "Setting up SSL..."
certbot --nginx \
    --non-interactive \
    --agree-tos \
    -m admin@bkbcktechxpression.in \
    --redirect \
    -d bkbcktechxpression.in \
    -d www.bkbcktechxpression.in --force-renewal

echo "VPS Setup Complete!"
