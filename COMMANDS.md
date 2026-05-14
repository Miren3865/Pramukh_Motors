# 🎯 Command Reference Guide

## Quick Commands

### Installation
```bash
# Install frontend dependencies
cd client && npm install

# Install backend dependencies
cd server && npm install

# Install both (from root)
cd client && npm install && cd ../server && npm install
```

### Development Mode
```bash
# Start backend server (runs on port 5000)
cd server
npm run dev

# Start frontend server (runs on port 3000)
cd client
npm run dev
```

### Production Build
```bash
# Build frontend
cd client
npm run build

# Start backend in production
cd server
npm start
```

### Database
```bash
# MongoDB is already configured in .env
# No setup needed - it's cloud-based (MongoDB Atlas)
```

### Admin Setup (First Time Only)
```bash
# Initialize admin user (run once)
curl -X POST http://localhost:5000/api/admin/initialize

# Or in browser:
# GET http://localhost:5000/api/admin/initialize
```

---

## Port Management

### Default Ports
```
Frontend: 3000
Backend:  5000
```

### Check if Ports are in Use
```bash
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# macOS/Linux
lsof -i :3000
lsof -i :5000
```

### Kill Process on Port
```bash
# Windows
taskkill /PID <PID> /F

# macOS/Linux
kill -9 <PID>
```

---

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```env
MONGO_URI=mongodb+srv://Second_Hand_Car_Dealing:SHCD_123@secondhandcardealing.2uvmejl.mongodb.net/secondhandcar?retryWrites=true&w=majority&appName=SecondHandCarDealing
PORT=5000
NODE_ENV=development
JWT_SECRET=pramukh_motors_super_secret_key_2024
ADMIN_EMAIL=your_email
ADMIN_PASSWORD=your_password
```

---

## Testing Commands

### API Testing with cURL

#### Test Health Check
```bash
curl http://localhost:5000/health
```

#### Submit Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Interested in luxury cars"
  }'
```

#### Admin Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your_email",
    "password": "your_password"
  }'
```

#### Get All Contacts (with JWT token)
```bash
curl -X GET http://localhost:5000/api/admin/contacts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

#### Get Statistics
```bash
curl -X GET http://localhost:5000/api/admin/stats \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

#### Delete Contact
```bash
curl -X DELETE http://localhost:5000/api/admin/contacts/CONTACT_ID_HERE \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## Database Commands

### View MongoDB Data
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Login with your credentials
3. Select cluster → Collections
4. View `contacts` and `admins` collections

### Direct MongoDB Query (if using local MongoDB)
```bash
# Connect to MongoDB
mongo mongodb+srv://Second_Hand_Car_Dealing:SHCD_123@secondhandcardealing.2uvmejl.mongodb.net/secondhandcar

# View contacts
db.contacts.find()

# Count contacts
db.contacts.countDocuments()

# Delete a contact
db.contacts.deleteOne({ _id: ObjectId("...") })
```

---

## Git Commands

### Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/pramukh-motors
git branch -M main
git push -u origin main
```

### Pushing Updates
```bash
git add .
git commit -m "Description of changes"
git push
```

---

## File Editing Commands

### Change Brand Name
```bash
# Search for "Pramukh Motors" and replace in:
# - client/src/components/Navbar.jsx
# - client/src/components/Footer.jsx
# - client/index.html
```

### Update Colors
```bash
# Edit: client/tailwind.config.js
# Change: colors section
```

### Add New Car to Inventory
```bash
# Edit: client/src/components/FeaturedCarsSection.jsx
# Add to: cars array
```

---

## Deployment Commands

### Deploy Frontend (Vercel)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd client
vercel
```

### Deploy Backend (Render)
```bash
# Via web interface at render.com
# or use Railway.app for easier deployment
```

---

## Debugging Commands

### View Frontend Logs
```bash
# Check browser console (F12)
# Look for errors in Network tab
# Check Application tab for localStorage
```

### View Backend Logs
```bash
# Logs appear in terminal where npm run dev is running
# Look for ✅ and ❌ messages
```

### View Network Requests
```bash
# In browser DevTools:
# 1. Open Network tab
# 2. Try submitting form
# 3. Look for /api/contact request
# 4. Check Response for success/error
```

### Check Admin Token
```bash
# In browser console:
localStorage.getItem('adminToken')

# To clear:
localStorage.removeItem('adminToken')
```

---

## Performance Commands

### Analyze Frontend Bundle
```bash
cd client
npm run build
# Check dist/ folder size
```

### Check Page Load Time
```bash
# In Chrome DevTools:
# 1. Open Performance tab
# 2. Record page load
# 3. Analyze timeline
```

---

## Backup & Restore

### Backup Project
```bash
# Zip entire folder
# or use Git to push to GitHub
```

### Export Database
```bash
# Via MongoDB Atlas dashboard:
# Collections → export to JSON
```

---

## Common Issues & Fixes

### Issue: Port Already in Use
```bash
# Solution: Kill the process
# Windows: taskkill /PID <PID> /F
# macOS/Linux: kill -9 <PID>
```

### Issue: CORS Error
```bash
# Solution: Make sure backend is running
npm run dev (in server folder)

# Or check VITE_API_URL in .env
```

### Issue: MongoDB Connection Error
```bash
# Solution: 
# 1. Check .env file has correct MONGO_URI
# 2. Check MongoDB Atlas IP whitelist
# 3. Check internet connection
# 4. Restart server
```

### Issue: Admin Login Not Working
```bash
# Solution: Initialize admin user
curl -X POST http://localhost:5000/api/admin/initialize
```

---

## Useful Links

```
Homepage:        http://localhost:3000
Admin Login:     http://localhost:3000/admin/login
Admin Dashboard: http://localhost:3000/admin/dashboard
API Base:        http://localhost:5000/api
Health Check:    http://localhost:5000/health
```

---

## File Locations Quick Reference

```
Config Files:
- Frontend: client/.env
- Backend: server/.env
- Frontend Build: client/vite.config.js
- Styles: client/tailwind.config.js

Source Code:
- Components: client/src/components/
- Pages: client/src/pages/
- Routes: server/routes/
- Controllers: server/controllers/
- Models: server/models/

Database:
- Connection: server/config/database.js

Documentation:
- Start here: QUICKSTART.md
- For deploy: DEPLOYMENT.md
- API docs: API.md
- Architecture: ARCHITECTURE.md
```

---

## Package.json Scripts

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend Scripts
```bash
npm run dev      # Start with auto-reload
npm start        # Start production
```

---

## Environment Setup Checklist

- [ ] Clone repository
- [ ] Run `npm install` in both folders
- [ ] Check .env files have correct values
- [ ] Test MongoDB connection
- [ ] Start backend: `npm run dev`
- [ ] Start frontend: `npm run dev`
- [ ] Visit http://localhost:3000
- [ ] Test contact form
- [ ] Login to admin panel
- [ ] Initialize admin if needed

---

## Deployment Checklist

- [ ] Test locally completely
- [ ] Update admin password
- [ ] Change JWT_SECRET
- [ ] Set correct VITE_API_URL
- [ ] Run production build
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Render
- [ ] Test all endpoints
- [ ] Setup custom domain (optional)
- [ ] Enable SSL/HTTPS
- [ ] Setup monitoring

---

## Security Reminders

⚠️ **Change Before Deployment:**
```
1. JWT_SECRET - Use a secure random string
2. ADMIN_PASSWORD - Create strong password
3. ADMIN_EMAIL - Use real email
4. MONGO_URI - Use production database
5. Remove console.log statements
```

---

**Keep this guide handy for quick reference! 📋**
