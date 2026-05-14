# Pramukh Motors - Premium Luxury Car Dealer

A full-stack premium second-hand luxury car dealer website with modern animations, glassmorphism effects, and a responsive admin dashboard.

## 🚀 Live Demo

- **Website**: [Pramukh Motors](https://pramukh-motors.vercel.app)
- **Admin Dashboard**: [Admin Panel](https://pramukh-motors.vercel.app/admin/login)
- **Backend API**: [Pramukh API](https://pramukh-motors-api.render.com)

## 📋 Project Structure

```
pramukh-motors/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── layouts/       # Layout components
│   │   ├── animations/    # Framer Motion variants
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   ├── assets/        # Images and static files
│   │   ├── App.jsx        # Main app component
│   │   └── index.css      # Global styles
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env              # Environment variables
│
├── server/                # Backend (Node + Express)
│   ├── config/           # Database config
│   ├── controllers/      # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth & error handling
│   ├── utils/            # Utility functions
│   ├── server.js         # Entry point
│   ├── package.json
│   └── .env              # Environment variables
│
└── README.md            # This file
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **React Router DOM** - Routing
- **Swiper.js** - Carousel
- **Axios** - HTTP client
- **React Icons** - Icons
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account
- Git

### Frontend Setup

```bash
# Navigate to client directory
cd pramukh-motors/client

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your API URL
# VITE_API_URL=http://localhost:5000/api

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Setup

```bash
# Navigate to server directory
cd pramukh-motors/server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI and JWT secret
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

# Start development server
npm run dev

# Start production server
npm start
```

## 🌐 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@pramukhmotors.com
ADMIN_PASSWORD=admin123
```

## 🔐 Default Admin Credentials

```
Email: admin@pramukhmotors.com
Password: admin123
```

**⚠️ Change these credentials in production!**

## 📌 Key Features

### Frontend
- ✨ Premium hero section with animations
- 🚗 Featured luxury car inventory
- 📊 Why choose us section with icons
- 🏢 Showroom section with counter animations
- 💬 Customer testimonials carousel
- 📧 Contact form with backend integration
- 🎨 Dark/Light theme support
- 📱 Fully responsive design
- ♿ Accessibility features
- ⚡ Optimized performance
- 🎭 Advanced animations with Framer Motion
- 🌊 Glassmorphism effects
- 🔔 Toast notifications
- 🔄 Scroll progress indicator

### Backend
- 🔐 JWT authentication
- 📧 Contact form API
- 👨‍💼 Admin dashboard API
- 🗄️ MongoDB integration
- ✅ Input validation
- 🛡️ CORS security
- 🚀 RESTful architecture
- 📊 Statistics API
- 🔒 Protected routes

### Admin Dashboard
- 📋 View all contact submissions
- 🗑️ Delete messages
- 📊 Dashboard statistics
- 🔐 JWT protected routes
- 🎨 Modern UI with animations
- 📱 Responsive design
- 🔄 Real-time data

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variable:
   ```
   VITE_API_URL=your_backend_api_url
   ```
4. Deploy!

```bash
# Or deploy via CLI
npm install -g vercel
vercel
```

### Backend Deployment (Render/Railway)

#### Option 1: Render

1. Create account on [Render](https://render.com)
2. New Web Service → Connect GitHub repo
3. Set environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
4. Deploy!

#### Option 2: Railway

1. Create account on [Railway](https://railway.app)
2. New Project → GitHub
3. Select repository
4. Set environment variables
5. Deploy!

### Database (MongoDB Atlas)

1. Create account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster
3. Create database user
4. Get connection string
5. Use in `.env` file

## 📚 API Endpoints

### Contact Routes
- `POST /api/contact` - Submit contact form
- `GET /api/admin/contacts` - Get all contacts (protected)
- `GET /api/admin/contacts/:id` - Get single contact (protected)
- `DELETE /api/admin/contacts/:id` - Delete contact (protected)
- `GET /api/admin/stats` - Get dashboard stats (protected)

### Admin Routes
- `POST /api/admin/login` - Admin login
- `GET /api/admin/profile` - Get admin profile (protected)
- `POST /api/admin/initialize` - Initialize admin user

## 🎨 Customization

### Colors
Edit `client/tailwind.config.js`:
```js
colors: {
  'neon-blue': '#00D9FF',
  'neon-purple': '#C000FF',
  'dark-bg': '#0A0E27',
  'dark-card': '#1A1F3A',
}
```

### Animations
Edit `client/src/animations/variants.js` for Framer Motion configurations.

### Branding
Update logo and company name in:
- `client/src/components/Navbar.jsx`
- `client/src/components/Footer.jsx`
- `client/index.html`

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Error
- Check MongoDB Atlas IP whitelist
- Verify connection string in .env
- Ensure network connectivity

### CORS Issues
- Check backend CORS configuration
- Verify API URL in frontend .env
- Ensure backend is running

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👨‍💻 Author

Built with ❤️ by the Pramukh Motors Team

## 🤝 Contributing

Contributions welcome! Please submit pull requests with your improvements.

## 📞 Support

For support, email hello@pramukhmotors.com

## 🎯 Roadmap

- [ ] Advanced car filtering
- [ ] Payment integration
- [ ] Real car listings
- [ ] User accounts
- [ ] Email notifications
- [ ] SMS integration
- [ ] WhatsApp integration
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] AI chatbot

---

Made with ❤️ for car enthusiasts
"# Pramukh_Motors" 
"# Pramukh_Motors" 
