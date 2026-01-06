#!/bin/bash

# Move build files to /var/www
mkdir -p /var/www/techsidedown
# Ensure consistent copy
cp -r /root/techsidedown/frontend/dist/* /var/www/techsidedown/

# Install Nginx
apt-get update
apt-get install -y nginx

# Configure Nginx
cat > /etc/nginx/sites-available/default <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name bkbcktechxpression.in www.bkbcktechxpression.in;

    root /var/www/techsidedown;
    index index.html;

    # Frontend
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Backend API Proxy
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

# Test and reload Nginx
nginx -t && systemctl reload nginx

# Check firewall
if ufw status | grep -q "Status: active"; then
    ufw allow 80/tcp
    ufw allow 5001/tcp
    ufw allow 22/tcp
fi

echo "Nginx setup complete (HTTP only)."
