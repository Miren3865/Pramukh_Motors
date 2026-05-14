# 🚀 Quick Start Guide

## 5-Minute Setup

### Prerequisites
- Node.js 16+ installed
- MongoDB Atlas account
- Git

### Step 1: Clone & Install

```bash
cd revora-motors

# Install Backend
cd server
npm install
cd ..

# Install Frontend  
cd client
npm install
cd ..
```

### Step 2: Configure Environment

```bash
# Backend is already configured with .env
# Frontend is already configured with .env

# Optional: Create .env files from examples
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### Step 3: Start Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

You should see:
```
╔════════════════════════════════════════════╗
║   🚗 Revora Motors Backend Server 🚗      ║
║   ✅ Server running on port 5000          ║
║   ✅ Database connected                   ║
╚════════════════════════════════════════════╝
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

Visit: http://localhost:3000

### Step 4: Initialize Admin (First Time Only)

```bash
# Call this endpoint to create admin user
curl -X POST http://localhost:5000/api/admin/initialize
```

Or use Postman:
- Method: POST
- URL: `http://localhost:5000/api/admin/initialize`
- Click "Send"

### Step 5: Access Admin Dashboard

1. Go to http://localhost:3000/admin/login
2. Login with:
   - Email: `admin@revoramotors.com`
   - Password: `admin123`

## Features Overview

### 🎨 Frontend Features
- [x] Animated hero section
- [x] Car inventory grid
- [x] Why choose us section
- [x] Luxury showroom section
- [x] Customer testimonials carousel
- [x] Contact form
- [x] Responsive navbar
- [x] Footer with links
- [x] Page loader animation
- [x] WhatsApp floating button
- [x] Scroll progress indicator

### 🔧 Backend Features
- [x] Contact form API
- [x] MongoDB integration
- [x] Admin authentication (JWT)
- [x] Admin dashboard API
- [x] Statistics API
- [x] Error handling
- [x] CORS configured

### 👨‍💼 Admin Dashboard
- [x] View all submissions
- [x] Delete messages
- [x] View statistics
- [x] Filter by status
- [x] Responsive design

## Testing the Contact Form

1. Navigate to http://localhost:3000
2. Scroll down to contact section
3. Fill in the form:
   - Name: John Doe
   - Email: john@example.com
   - Message: Your message here
4. Click "Send Message"
5. You should see a success toast
6. Go to admin dashboard to verify

## Customization Tips

### Change Brand Name
1. Edit `client/src/components/Navbar.jsx` line 31
2. Edit `client/src/components/Footer.jsx` line 69
3. Edit `client/index.html` title tag

### Change Colors
1. Edit `client/tailwind.config.js` colors section
2. Update primary colors and gradients
3. Colors auto-update everywhere

### Add More Cars
Edit `client/src/components/FeaturedCarsSection.jsx`:
```jsx
const cars = [
  {
    id: 1,
    name: 'Car Name',
    year: 2023,
    fuel: 'Petrol',
    mileage: 15000,
    transmission: 'Automatic',
    price: 125000,
  },
  // Add more cars...
]
```

### Update Testimonials
Edit `client/src/components/TestimonialSection.jsx`:
```jsx
const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CEO',
    image: '👨‍💼',
    rating: 5,
    text: 'Great experience!',
  },
  // Add more testimonials...
]
```

## Useful Commands

```bash
# Backend
npm run dev      # Development mode with auto-reload
npm start        # Production mode
npm run build    # Build project

# Frontend
npm run dev      # Start dev server on :3000
npm run build    # Production build
npm run preview  # Preview production build
```

## API Testing with Postman/cURL

### Test Contact API
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

### Admin Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@revoramotors.com",
    "password": "admin123"
  }'
```

### Get All Contacts (Protected)
```bash
curl -X GET http://localhost:5000/api/admin/contacts \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Kill process: `lsof -i :5000 \| kill -9 <PID>` |
| Port 3000 in use | Kill process: `lsof -i :3000 \| kill -9 <PID>` |
| MongoDB connection error | Check `.env` URI and Atlas whitelist |
| CORS error | Ensure backend is running on :5000 |
| Blank page | Check console for errors, clear cache |
| Admin login fails | Run initialize endpoint again |

## Next Steps

1. ✅ Test all features locally
2. 📦 Build for production: `npm run build`
3. 🚀 Deploy to Vercel/Render (see DEPLOYMENT.md)
4. 🔐 Change admin password in production
5. 📊 Monitor with logging tools
6. 🎨 Customize branding and content

## Getting Help

- Check `README.md` for detailed docs
- See `DEPLOYMENT.md` for production guide
- Review `package.json` for all dependencies
- Check console logs for errors

## Performance Tips

- Images are optimized
- Code splitting enabled
- Lazy loading implemented
- Caching headers set
- API calls batched

## Security Notes

⚠️ **Change these in production:**
- `JWT_SECRET` in backend .env
- Admin password
- API endpoints if needed
- CORS origins

## Quick Links

- 🏠 Homepage: http://localhost:3000
- 📊 Admin: http://localhost:3000/admin/login
- 🔗 API: http://localhost:5000
- 📝 API Docs: http://localhost:5000

---

**You're all set! Start building amazing features! 🚀**
