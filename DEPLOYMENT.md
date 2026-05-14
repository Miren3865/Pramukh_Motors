# 🚀 Revora Motors - Deployment Guide

## Quick Start

### 1. Local Development

```bash
# Terminal 1: Backend
cd server
npm install
npm run dev  # Runs on http://localhost:5000

# Terminal 2: Frontend
cd client
npm install
npm run dev  # Runs on http://localhost:3000
```

## Frontend Deployment (Vercel)

### Step-by-Step

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/revora-motors
git push -u origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Sign in with GitHub
- Click "New Project"
- Select `revora-motors` repository
- Choose `client` as root directory
- Set environment variables:
  ```
  VITE_API_URL=https://your-backend-api.com/api
  ```
- Click "Deploy"

3. **Custom Domain (Optional)**
- In Vercel dashboard → Settings → Domains
- Add your custom domain

### Vercel Environment Variables

```env
VITE_API_URL=https://revora-motors-api.render.com/api
```

## Backend Deployment (Render)

### Step-by-Step

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +"
   - Select "Web Service"
   - Connect GitHub repository
   - Select repository

3. **Configure**
   - **Name**: revora-motors-api
   - **Root Directory**: server
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

4. **Environment Variables**
   ```
   MONGO_URI=mongodb+srv://Second_Hand_Car_Dealing:SHCD_123@secondhandcardealing.2uvmejl.mongodb.net/secondhandcar?retryWrites=true&w=majority
   JWT_SECRET=your_secure_secret_key_here
   NODE_ENV=production
   ADMIN_EMAIL=admin@revoramotors.com
   ADMIN_PASSWORD=secure_password_here
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy the API URL

### Update Frontend

After backend deployment:
1. Go to Vercel dashboard
2. Select your project
3. Settings → Environment Variables
4. Update `VITE_API_URL` with your Render URL:
   ```
   VITE_API_URL=https://your-app.render.com/api
   ```
5. Redeploy

## Backend Deployment (Railway Alternative)

### Step-by-Step

1. **Connect GitHub**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "GitHub Repo"
   - Choose repository

3. **Configure**
   - Select `server` directory
   - Set environment variables (same as Render)

4. **Deploy**
   - Railway auto-deploys on git push

## Database: MongoDB Atlas (Already Configured)

Your MongoDB connection is already configured:
```
mongodb+srv://Second_Hand_Car_Dealing:SHCD_123@secondhandcardealing.2uvmejl.mongodb.net/secondhandcar
```

## Post-Deployment Checklist

- [ ] Frontend deployed on Vercel
- [ ] Backend deployed on Render/Railway
- [ ] Database connection verified
- [ ] Environment variables set correctly
- [ ] CORS configured properly
- [ ] Admin credentials updated
- [ ] Contact form tested
- [ ] Admin dashboard accessible
- [ ] Custom domain configured (optional)

## Troubleshooting

### 502 Bad Gateway
- Check backend logs
- Verify environment variables
- Ensure database is accessible
- Restart deployment

### CORS Errors
- Update `VITE_API_URL` in frontend
- Verify backend CORS configuration
- Check API endpoint routes

### Database Connection Failed
- Verify MongoDB Atlas IP whitelist
- Check connection string
- Ensure database user has correct permissions

### Admin Dashboard Not Loading
- Verify JWT_SECRET is same in backend
- Check token in browser localStorage
- Clear browser cache and try again

## Monitoring & Logs

### Vercel
- Dashboard → Deployments → View logs
- Real-time logs available

### Render
- Dashboard → Select service
- Logs tab shows real-time output

### MongoDB Atlas
- Dashboard → Database Deployments
- View metrics and performance

## Scaling & Performance

### Frontend Optimization
- Images are optimized
- Code splitting enabled
- Lazy loading implemented

### Backend Optimization
- Database indexes created
- Request validation enabled
- Error handling implemented

### Suggested Improvements
- Add CDN for static assets
- Implement caching strategy
- Add rate limiting
- Setup monitoring alerts

## Support

- **Backend Issues**: Check Render logs
- **Frontend Issues**: Check Vercel logs
- **Database Issues**: Check MongoDB Atlas dashboard
- **API Issues**: Test with Postman or curl

---

**Happy Deploying! 🚀**
