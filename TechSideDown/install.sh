#!/bin/bash
set -e

echo "Starting deployment..."

# Navigate to project dir (assuming we are extracting into the target dir)
# or if we are in root of tarball

# Backend setup
echo "Setting up Backend..."
cd backend
npm install
npm run build
# Seed the database on VPS too
echo "Seeding database..."
# Use correct mongo uri for VPS if different?? 
# Earlier we set it to 127.0.0.1 in app.module.ts, which works on VPS too usually.
npx ts-node src/seed.ts

# Restart Backend PM2
if pm2 list | grep -q "tx-backend"; then
    echo "Restarting backend..."
    pm2 restart tx-backend --update-env
else
    echo "Starting backend..."
    PORT=5001 pm2 start dist/main.js --name "tx-backend"
fi

cd ..

# Frontend setup
echo "Setting up Frontend..."
cd frontend
npm install
# Build for production with correct API URL
export VITE_API_URL="https://bkbcktechxpression.in/api"
npm run build

echo "Deployment complete! Ensure Nginx is pointing to $(pwd)/dist"
