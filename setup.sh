#!/bin/bash
echo "Installing dependencies..."
cd server && npm install
cd ../client && npm install
cd ..

echo "Building client..."
cd client && npm run build
cd ..

echo "✅ Setup complete! Follow README.md for further steps."
