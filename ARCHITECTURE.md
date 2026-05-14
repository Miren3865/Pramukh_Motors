# 🏗️ Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Browser                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           Frontend (React + Vite)                       │  │
│  │  ├─ Components (Navbar, Hero, Cards, etc.)            │  │
│  │  ├─ Pages (Home, Admin Login, Dashboard)             │  │
│  │  ├─ Services (API calls with Axios)                  │  │
│  │  ├─ Animations (Framer Motion)                       │  │
│  │  └─ Styling (Tailwind CSS)                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            │                                    │
│                            ▼                                    │
│                   HTTP/REST Requests                            │
│                   (JSON payload)                                │
│                            │                                    │
└────────────────────────────┼───────────────────────────────────┘
                             │
                             ▼
        ┌────────────────────────────────────────┐
        │     Backend (Node + Express)           │
        │                                        │
        │  ┌──────────────────────────────────┐ │
        │  │  API Routes                      │ │
        │  │  ├─ /api/contact (POST)         │ │
        │  │  ├─ /api/admin/login (POST)     │ │
        │  │  ├─ /api/admin/contacts (GET)   │ │
        │  │  ├─ /api/admin/contacts (DELETE)│ │
        │  │  └─ /api/admin/stats (GET)      │ │
        │  └──────────────────────────────────┘ │
        │                                        │
        │  ┌──────────────────────────────────┐ │
        │  │  Controllers                     │ │
        │  │  ├─ contactController            │ │
        │  │  └─ adminController              │ │
        │  └──────────────────────────────────┘ │
        │                                        │
        │  ┌──────────────────────────────────┐ │
        │  │  Models (Mongoose)               │ │
        │  │  ├─ Contact                      │ │
        │  │  └─ Admin                        │ │
        │  └──────────────────────────────────┘ │
        │                                        │
        │  ┌──────────────────────────────────┐ │
        │  │  Middleware                      │ │
        │  │  ├─ JWT Authentication           │ │
        │  │  ├─ CORS                         │ │
        │  │  └─ Error Handler                │ │
        │  └──────────────────────────────────┘ │
        └────────────────────────────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  MongoDB Atlas  │
                    │  Database       │
                    │  ├─ contacts    │
                    │  └─ admins      │
                    └─────────────────┘
```

## Data Flow

### Contact Submission Flow
```
User submits form
    ↓
Form validation (client-side)
    ↓
HTTP POST /api/contact
    ↓
Server receives request
    ↓
Validation middleware
    ↓
Contact Controller
    ↓
Mongoose Schema Validation
    ↓
Save to MongoDB
    ↓
Return success response
    ↓
Toast notification to user
```

### Admin Login Flow
```
Admin enters credentials
    ↓
HTTP POST /api/admin/login
    ↓
Find admin in MongoDB
    ↓
Compare password (bcrypt)
    ↓
Generate JWT token
    ↓
Return token + admin info
    ↓
Store token in localStorage
    ↓
Redirect to dashboard
```

### Admin Dashboard Access Flow
```
Admin visits /admin/dashboard
    ↓
Protected route check
    ↓
Verify localStorage token
    ↓
If valid: Load dashboard
    ↓
Fetch contacts (with JWT)
    ↓
Fetch stats (with JWT)
    ↓
Display in UI
    ↓
If invalid: Redirect to login
```

## Component Hierarchy

```
App (Router)
├── Home
│   ├── Navbar
│   ├── HeroSection
│   ├── FeaturedCarsSection
│   │   └── CarCard (x6)
│   ├── WhyChooseUsSection
│   ├── ShowroomSection
│   ├── TestimonialSection
│   │   └── Swiper carousel
│   ├── ContactSection
│   │   └── Contact form
│   └── Footer
│
├── AdminLogin
│   └── Login form
│
└── AdminDashboard
    ├── Header with logout
    ├── Stats Grid
    └── Contacts Table
```

## Database Schema

### Contact Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  message: String (required),
  status: String (enum: ['new', 'read', 'responded']),
  createdAt: Date (default: now),
  updatedAt: Date
}
```

### Admin Collection
```javascript
{
  _id: ObjectId,
  email: String (required, unique),
  password: String (hashed),
  name: String,
  role: String (enum: ['admin', 'super_admin']),
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Security Architecture

```
┌─────────────────────────────────────┐
│   Security Layers                   │
├─────────────────────────────────────┤
│                                     │
│  1. CORS - Control origins          │
│  2. Input Validation - Sanitize     │
│  3. Password Hashing - bcryptjs     │
│  4. JWT Auth - Verify tokens        │
│  5. Protected Routes - Check auth   │
│  6. Error Handling - Hide details   │
│  7. HTTPS - Encrypted transport     │
│                                     │
└─────────────────────────────────────┘
```

## Deployment Architecture

### Production Environment
```
┌──────────────────────────────────────────────────────┐
│              User accessing website                 │
└───────────────────────┬──────────────────────────────┘
                        │
        ┌───────────────┴───────────────┐
        ▼                               ▼
   ┌─────────────┐            ┌──────────────────┐
   │   Vercel    │            │  Render/Railway  │
   │  (Frontend) │            │  (Backend)       │
   └─────────────┘            └──────────────────┘
        │                               │
        │   API requests                │
        └───────────────────────────────┤
                                        ▼
                            ┌────────────────────┐
                            │  MongoDB Atlas     │
                            │  (Cloud Database)  │
                            └────────────────────┘
```

## Performance Optimization

### Frontend
- Code splitting with Vite
- Lazy loading components
- Image optimization
- Caching strategies
- Minification & compression

### Backend
- Connection pooling
- Database indexing
- Request validation
- Response compression
- Error handling

### Deployment
- CDN for static assets
- Edge caching
- Gzip compression
- Image optimization
- Code minification

## Scalability Considerations

1. **Database**
   - Add indexes on frequently queried fields
   - Implement connection pooling
   - Archive old data regularly

2. **Backend**
   - Implement rate limiting
   - Add caching layer (Redis)
   - Use load balancer
   - Horizontal scaling

3. **Frontend**
   - Serve from CDN
   - Implement service workers
   - Progressive image loading
   - Code splitting

## Monitoring & Logging

### Frontend Monitoring
- Error tracking (Sentry)
- Performance metrics (Web Vitals)
- User analytics
- Console logging

### Backend Monitoring
- Server logs (Winston/Morgan)
- Error tracking
- API metrics
- Database performance

### Database Monitoring
- Connection metrics
- Query performance
- Storage usage
- Backup status

## Future Enhancements

1. **Features**
   - Real car listings with images
   - User accounts & profiles
   - Wishlist functionality
   - Booking system
   - Payment integration

2. **Infrastructure**
   - Microservices architecture
   - Message queues (RabbitMQ)
   - Caching layer (Redis)
   - Search engine (Elasticsearch)

3. **DevOps**
   - Docker containerization
   - Kubernetes orchestration
   - CI/CD pipelines
   - Infrastructure as Code

---

**Architecture designed for scalability and maintainability.**
